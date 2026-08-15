import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderSync,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  FolderOpen,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { DriveFolderFile, DEFAULT_DRIVE_FOLDER_ID } from '../services/googleDriveService';

interface GoogleDriveFolderSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDriveFolderSyncModal: React.FC<GoogleDriveFolderSyncModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    driveFolderId,
    setDriveFolderId,
    driveFiles,
    isSyncingDrive,
    driveSyncStatus,
    driveSyncError,
    currentUser,
    handleGoogleSignIn,
    handleGoogleSignOut,
    syncGoogleDriveFolder,
    applyDriveFilesToStudio,
    projects
  } = useStudio();

  const [inputFolder, setInputFolder] = useState(driveFolderId || DEFAULT_DRIVE_FOLDER_ID);
  const [selectedMappingMode, setSelectedMappingMode] = useState<'auto' | 'custom'>('auto');
  const [customMappings, setCustomMappings] = useState<{
    logoIndex: number;
    heroIndex: number;
    projectIndices: number[];
  }>({
    logoIndex: 0,
    heroIndex: 1,
    projectIndices: [2, 3, 4, 5]
  });

  useEffect(() => {
    if (driveFiles.length > 0) {
      setCustomMappings({
        logoIndex: 0,
        heroIndex: Math.min(1, driveFiles.length - 1),
        projectIndices: projects.map((_, i) => (i + 2) % driveFiles.length)
      });
    }
  }, [driveFiles, projects]);

  if (!isOpen) return null;

  const handleFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let cleanedId = inputFolder.trim();
    // Support full Google Drive folder URLs
    if (cleanedId.includes('/folders/')) {
      const match = cleanedId.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        cleanedId = match[1];
      }
    } else if (cleanedId.includes('id=')) {
      const match = cleanedId.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        cleanedId = match[1];
      }
    }

    setDriveFolderId(cleanedId);
    await syncGoogleDriveFolder(cleanedId);
  };

  const handleApplyAll = () => {
    if (driveFiles.length === 0) return;
    applyDriveFilesToStudio(driveFiles);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/70">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <FolderSync className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-serif tracking-wide text-slate-100 flex items-center gap-2">
                  <span>Google Drive Folder Synchronizer</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    WORKSPACE OAUTH
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Import and sync high-resolution imagery directly from your Google Drive folder
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              title="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* OAuth Connection Status Banner */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    currentUser ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-amber-400 animate-pulse'
                  }`}
                />
                <div>
                  <div className="text-xs font-mono font-medium text-slate-200">
                    {currentUser ? `Connected as: ${currentUser.email || currentUser.displayName || 'Google User'}` : 'Google Drive Account Authorization'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {currentUser
                      ? 'Access granted to read folder files and download high-resolution photos.'
                      : 'Sign in with your Google account to read files from your private or shared Google Drive folder.'}
                  </div>
                </div>
              </div>

              {currentUser ? (
                <button
                  onClick={handleGoogleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>DISCONNECT</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-slate-900 font-medium text-xs shadow-md hover:bg-slate-100 transition-all font-sans"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>

            {/* Folder ID Input Form */}
            <form onSubmit={handleFolderSubmit} className="space-y-3">
              <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                Google Drive Folder URL or ID
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
                  <input
                    type="text"
                    value={inputFolder}
                    onChange={(e) => setInputFolder(e.target.value)}
                    placeholder="e.g. 1wnpKw11lP1wI542pFPMC5gdwqv_pCpFP or https://drive.google.com/drive/folders/..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs font-mono text-slate-100 placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSyncingDrive}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono tracking-wider transition-colors shadow-lg shadow-amber-500/20"
                >
                  {isSyncingDrive ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>SCANNING FOLDER...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>FETCH PHOTOS</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Target folder configured: <span className="text-amber-300">{inputFolder}</span>
              </p>
            </form>

            {/* Sync Progress / Error Status */}
            {driveSyncStatus && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-200 flex items-center gap-2.5">
                {isSyncingDrive ? (
                  <Loader2 className="h-4 w-4 text-amber-400 animate-spin flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                )}
                <span>{driveSyncStatus}</span>
              </div>
            )}

            {driveSyncError && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-xs font-mono text-red-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Sync Notice</div>
                  <div className="text-[11px] opacity-90">{driveSyncError}</div>
                  {!currentUser && (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="mt-2 text-xs font-sans text-amber-300 underline font-semibold flex items-center gap-1"
                    >
                      Click here to authenticate with Google to access this folder
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Detected Drive Images Preview Grid */}
            {driveFiles.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                      {driveFiles.length} Photos Found in Drive Folder
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Ready to map and replace portfolio images
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-1">
                  {driveFiles.map((file, index) => (
                    <div
                      key={file.id || index}
                      className="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-amber-400/60 transition-all shadow-md"
                    >
                      <div className="aspect-[4/3] w-full bg-slate-900 relative overflow-hidden">
                        <img
                          src={file.directUrl}
                          alt={file.name}
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            // Fallback to high res thumbnail url if direct lh3 fails
                            const target = e.currentTarget;
                            if (file.highResUrl && target.src !== file.highResUrl) {
                              target.src = file.highResUrl;
                            }
                          }}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[9px] font-mono text-amber-300 font-bold">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] font-mono text-slate-300 truncate" title={file.name}>
                          {file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Intelligent Mapping Summary */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                    <Sparkles className="h-4 w-4" />
                    <span>Automatic Portfolio Replacement Plan</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px] font-mono text-slate-300">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Brand Logo:</span>
                      <span className="font-bold text-amber-400 truncate max-w-[120px]" title={driveFiles[0]?.name}>
                        {driveFiles[0]?.name || 'Auto-mapped'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Hero Architecture:</span>
                      <span className="font-bold text-amber-400 truncate max-w-[120px]" title={driveFiles[1]?.name || driveFiles[0]?.name}>
                        {driveFiles[1]?.name || driveFiles[0]?.name}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Projects & Galleries:</span>
                      <span className="font-bold text-emerald-400">
                        {Math.max(0, driveFiles.length - 2)} Photos Mapped
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center space-y-3 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
                <FolderOpen className="h-10 w-10 text-slate-600 mx-auto" />
                <div className="text-xs font-mono text-slate-300 font-medium">
                  No images loaded from Google Drive yet
                </div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto font-mono">
                  Click <span className="text-amber-300 font-bold">"FETCH PHOTOS"</span> or sign in to scan folder{' '}
                  <span className="text-amber-400 font-bold">{DEFAULT_DRIVE_FOLDER_ID}</span>.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-slate-100 transition-colors"
            >
              CANCEL
            </button>

            <button
              onClick={handleApplyAll}
              disabled={driveFiles.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all shadow-lg shadow-amber-500/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>APPLY ALL FOLDER PHOTOS TO PORTFOLIO</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
