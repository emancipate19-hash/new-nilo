import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { useStudio } from '../context/StudioContext';
import { X, Upload, Camera, Check } from 'lucide-react';
import { SAMPLE_PROJECT_IMAGES } from '../assets/images/defaultAssets';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject?: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  editingProject
}) => {
  const { addProject, updateProject, uploadFileAsDataUrl } = useStudio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(editingProject?.title || '');
  const [subtitle, setSubtitle] = useState(editingProject?.subtitle || '');
  const [category, setCategory] = useState(editingProject?.category || 'RESIDENTIAL');
  const [location, setLocation] = useState(editingProject?.location || 'ADDIS ABABA, ETHIOPIA');
  const [year, setYear] = useState(editingProject?.year || '2026');
  const [description, setDescription] = useState(editingProject?.description || '');
  const [area, setArea] = useState(editingProject?.specs?.area || '850 SQ. M');
  const [status, setStatus] = useState(editingProject?.specs?.status || 'BUILT');
  const [heroImage, setHeroImage] = useState(
    editingProject?.heroImage || SAMPLE_PROJECT_IMAGES[Math.floor(Math.random() * SAMPLE_PROJECT_IMAGES.length)]
  );
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const dataUrl = await uploadFileAsDataUrl(file);
      setHeroImage(dataUrl);
    } catch (err) {
      console.error('Failed to upload image', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const projectData: Project = {
      id: editingProject?.id || `project-${Date.now()}`,
      number: editingProject?.number || '00',
      title: title.toUpperCase(),
      subtitle: subtitle || 'Modern Architectural Structure',
      category: category.toUpperCase(),
      location: location.toUpperCase(),
      year: year,
      heroImage: heroImage,
      previewImage: heroImage,
      galleryImages: editingProject?.galleryImages || [heroImage],
      description: description || 'High-end contemporary architectural project designed by NILO AXIS STUDIO.',
      concept: editingProject?.concept || 'Contextual spatial response focusing on light, proportion, and structural clarity.',
      specs: {
        area: area,
        structuralType: editingProject?.specs?.structuralType || 'Reinforced Frame & Glass',
        materials: editingProject?.specs?.materials || ['Concrete', 'Anodized Bronze', 'Glass'],
        timeline: editingProject?.specs?.timeline || '18 MONTHS',
        status: status,
        climateStrategy: editingProject?.specs?.climateStrategy || 'Passive solar thermal mass & natural ventilation flues.'
      },
      floorPlan: editingProject?.floorPlan || {
        title: 'GROUND FLOOR PLAN',
        image: heroImage,
        spots: [
          {
            id: 'spot-1',
            label: 'MAIN ATRIUM & FOYER',
            description: 'Double-height entrance atrium with natural daylight skylight.',
            area: '140 SQ. M',
            x: 50,
            y: 50
          }
        ]
      },
      highlights: editingProject?.highlights || [
        'Custom structural engineering and high-performance building skin',
        'Sustainably sourced materials and low-carbon footprint',
        'Integrated smart lighting and climatic passive design'
      ]
    };

    if (editingProject) {
      updateProject(projectData);
    } else {
      addProject(projectData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-sm shadow-2xl p-6 md:p-8 my-8 text-slate-100 font-mono">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold uppercase tracking-wider text-amber-300 mb-1">
          {editingProject ? 'EDIT PROJECT ENTRY' : 'ADD NEW ARCHITECTURAL WORK'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Update the NILO AXIS STUDIO portfolio catalog. Changes will persist automatically.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Image Upload Area */}
          <div>
            <label className="block text-slate-300 mb-1 font-bold">PROJECT IMAGE</label>
            <div className="relative h-44 w-full bg-slate-950 border border-slate-700 rounded-sm overflow-hidden group">
              <img src={heroImage} alt="Project Preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-sm hover:bg-amber-300 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>{uploading ? 'UPLOADING...' : 'UPLOAD NEW IMAGE'}</span>
                </button>
                <span className="text-[10px] text-slate-400 mt-2">Supports JPG, PNG, WEBP, SVG</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1">PROJECT NAME *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AXIS PAVILION"
                className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">SUBTITLE</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Minimalist Lake Villa"
                className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
              >
                <option value="RESIDENTIAL">RESIDENTIAL</option>
                <option value="COMMERCIAL">COMMERCIAL</option>
                <option value="CULTURAL">CULTURAL</option>
                <option value="HOSPITALITY">HOSPITALITY</option>
                <option value="CIVIC">CIVIC</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">LOCATION & YEAR</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-2/3 bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
                />
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-1/3 bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">SHORT DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief architectural concept and spatial features..."
              className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1">BUILDING AREA</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 1,200 SQ. M"
                className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">STATUS</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="BUILT / UNDER CONSTRUCTION"
                className="w-full bg-slate-950 border border-slate-700 p-2 text-slate-100 rounded-sm focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Form Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-sm hover:bg-amber-300 transition-colors shadow-lg"
            >
              <Check className="h-4 w-4" />
              <span>{editingProject ? 'SAVE CHANGES' : 'CREATE PROJECT'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
