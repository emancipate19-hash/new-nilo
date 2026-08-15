import { auth, getAccessToken, googleSignIn } from './auth';

export interface DriveFolderFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  directUrl: string;
  highResUrl: string;
}

export const DEFAULT_DRIVE_FOLDER_ID = '1wnpKw11lP1wI542pFPMC5gdwqv_pCpFP';

/**
 * Generates direct high-resolution and preview URLs for a Google Drive file ID
 */
export const getDriveImageUrl = (fileId: string): string => {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

export const getDriveThumbnailUrl = (fileId: string, width: number = 1200): string => {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
};

/**
 * Fetches all image files from a given Google Drive folder using the Drive v3 API
 */
export const fetchDriveFolderFiles = async (
  folderId: string = DEFAULT_DRIVE_FOLDER_ID,
  customToken?: string | null
): Promise<DriveFolderFile[]> => {
  const token = customToken || (await getAccessToken());

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const fields = encodeURIComponent('files(id,name,mimeType,thumbnailLink,webContentLink,createdTime)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=100&orderBy=name`;

  try {
    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      if (res.status === 401 || res.status === 403) {
        throw new Error(errJson.error?.message || 'Authentication required to access this Google Drive folder.');
      }
      throw new Error(errJson.error?.message || `Failed to fetch files from Google Drive (Status ${res.status})`);
    }

    const data = await res.json();
    const rawFiles: any[] = data.files || [];

    const imageFiles: DriveFolderFile[] = rawFiles
      .filter((f) => f.mimeType?.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(f.name))
      .map((f) => ({
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        thumbnailLink: f.thumbnailLink,
        webContentLink: f.webContentLink,
        directUrl: getDriveImageUrl(f.id),
        highResUrl: getDriveThumbnailUrl(f.id, 1600)
      }));

    return imageFiles;
  } catch (error: any) {
    console.error('Error fetching Google Drive files:', error);
    throw error;
  }
};

/**
 * Downloads a Drive file as a blob/DataURL using the authenticated token
 */
export const fetchDriveImageBlobUrl = async (fileId: string): Promise<string> => {
  const token = await getAccessToken();
  if (!token) {
    return getDriveImageUrl(fileId);
  }

  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      return getDriveImageUrl(fileId);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return getDriveImageUrl(fileId);
  }
};
