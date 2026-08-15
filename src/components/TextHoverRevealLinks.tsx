import React, { useState } from 'react';
import { CursorContextState, JournalArticle, ServiceItem } from '../types';
import { Sparkles, ArrowUpRight, BookOpen, Layers, Plus, Edit2, Trash2, X, Check, Upload } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface TextHoverRevealLinksProps {
  setCursorContext: (context: CursorContextState) => void;
  onOpenArticle: (article: JournalArticle) => void;
}

export const TextHoverRevealLinks: React.FC<TextHoverRevealLinksProps> = ({
  setCursorContext,
  onOpenArticle
}) => {
  const {
    servicesList,
    addServiceItem,
    updateServiceItem,
    deleteServiceItem,
    journalArticles,
    addJournalArticle,
    updateJournalArticle,
    deleteJournalArticle,
    isAdminMode,
    uploadFileAsDataUrl
  } = useStudio();

  const [hoveredLink, setHoveredLink] = useState<{
    title: string;
    image: string;
  } | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Service Edit / Add Modal State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<ServiceItem>({
    id: '',
    title: '',
    image: '',
    description: ''
  });

  // Journal Edit / Add Modal State
  const [editingJournal, setEditingJournal] = useState<JournalArticle | null>(null);
  const [isAddingJournal, setIsAddingJournal] = useState(false);
  const [journalForm, setJournalForm] = useState<JournalArticle>({
    id: '',
    title: '',
    category: 'ESSAY',
    date: 'AUGUST 2026',
    readTime: '5 MIN READ',
    excerpt: '',
    image: ''
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Service Handlers
  const handleOpenAddService = () => {
    setServiceForm({
      id: `serv-${Date.now()}`,
      title: 'NEW ARCHITECTURAL DISCIPLINE',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Description of specialized architectural capability.'
    });
    setIsAddingService(true);
    setEditingService(null);
  };

  const handleOpenEditService = (service: ServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setServiceForm({ ...service });
    setEditingService(service);
    setIsAddingService(false);
  };

  const handleSaveService = () => {
    if (!serviceForm.title.trim()) return;
    if (isAddingService) {
      addServiceItem(serviceForm);
    } else if (editingService) {
      updateServiceItem(serviceForm);
    }
    setIsAddingService(false);
    setEditingService(null);
  };

  // Journal Handlers
  const handleOpenAddJournal = () => {
    setJournalForm({
      id: `article-${Date.now()}`,
      title: 'NEW ESSAY ON SPATIAL DESIGN',
      category: 'ESSAY',
      date: 'CURRENT DATE 2026',
      readTime: '6 MIN READ',
      excerpt: 'Summary excerpt of field research and design theory...',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    });
    setIsAddingJournal(true);
    setEditingJournal(null);
  };

  const handleOpenEditJournal = (article: JournalArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    setJournalForm({ ...article });
    setEditingJournal(article);
    setIsAddingJournal(false);
  };

  const handleSaveJournal = () => {
    if (!journalForm.title.trim()) return;
    if (isAddingJournal) {
      addJournalArticle(journalForm);
    } else if (editingJournal) {
      updateJournalArticle(journalForm);
    }
    setIsAddingJournal(false);
    setEditingJournal(null);
  };

  const handleImageUploadForService = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await uploadFileAsDataUrl(file);
      setServiceForm({ ...serviceForm, image: dataUrl });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUploadForJournal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await uploadFileAsDataUrl(file);
      setJournalForm({ ...journalForm, image: dataUrl });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative my-20 py-16 border-t border-b border-slate-800/80"
    >
      {/* Services Hover Links Section */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Layers className="h-4 w-4" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold">
                ATELIER CAPABILITIES & DISCIPLINES
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-slate-100 uppercase">
              ARCHITECTURAL SERVICES & RESEARCH
            </h2>
          </div>

          {isAdminMode && (
            <button
              onClick={handleOpenAddService}
              className="flex items-center gap-2 rounded-sm bg-cyan-400 px-4 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-300 transition-all self-start sm:self-auto shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <Plus className="h-4 w-4" />
              <span>ADD NEW SERVICE</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-800/80">
          {servicesList.map((service, idx) => (
            <div
              key={service.id || idx}
              onMouseEnter={() => {
                setHoveredLink({ title: service.title, image: service.image });
                setCursorContext({ mode: 'link', text: 'DISCIPLINE' });
              }}
              onMouseLeave={() => {
                setHoveredLink(null);
                setCursorContext({ mode: 'default' });
              }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-4 cursor-pointer hover:bg-slate-900/40 transition-colors"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-cyan-400">0{idx + 1}</span>
                <h3 className="text-base md:text-xl font-mono font-bold text-slate-200 group-hover:text-cyan-200 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <p className="text-xs font-mono text-slate-400">
                  {service.description}
                </p>

                {isAdminMode && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => handleOpenEditService(service, e)}
                      className="p-1.5 rounded bg-slate-800 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteServiceItem(service.id);
                      }}
                      className="p-1.5 rounded bg-slate-800 text-rose-300 hover:bg-rose-500 hover:text-slate-950 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Section */}
      <div id="journal" className="pt-12 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold">
                FIELD NOTES & DISCOURSE
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-slate-100 uppercase">
              ARCHITECTURAL JOURNAL
            </h2>
          </div>

          {isAdminMode && (
            <button
              onClick={handleOpenAddJournal}
              className="flex items-center gap-2 rounded-sm bg-cyan-400 px-4 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-300 transition-all self-start sm:self-auto shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <Plus className="h-4 w-4" />
              <span>ADD NEW ARTICLE</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              onMouseEnter={() => setCursorContext({ mode: 'link', text: 'READ ESSAY' })}
              onMouseLeave={() => setCursorContext({ mode: 'default' })}
              className="group relative cursor-pointer rounded-sm bg-slate-900/60 border border-slate-800 p-6 transition-all hover:border-cyan-500/50 hover:bg-slate-900 flex flex-col justify-between"
            >
              {isAdminMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={(e) => handleOpenEditJournal(article, e)}
                    className="p-1.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-400 hover:text-slate-950 transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteJournalArticle(article.id);
                    }}
                    className="p-1.5 rounded bg-slate-950/80 text-rose-300 border border-rose-500/50 hover:bg-rose-500 hover:text-slate-950 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div>
                <div className="aspect-[16/9] overflow-hidden rounded-sm mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase mb-2">
                  {article.category} — {article.date} ({article.readTime})
                </div>

                <h3 className="text-sm font-mono font-bold text-slate-100 group-hover:text-cyan-200 line-clamp-2">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs font-mono text-slate-400 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span>READ ARTICLE</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {(isAddingService || editingService) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/50 rounded-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-cyan-300 uppercase">
                {isAddingService ? 'Add Architectural Service' : 'Edit Service'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingService(false);
                  setEditingService(null);
                }}
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">TITLE</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">PREVIEW IMAGE URL / UPLOAD</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                  />
                  <label className="cursor-pointer flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded text-xs font-mono text-cyan-300 hover:bg-cyan-400 hover:text-slate-950">
                    <Upload className="h-3.5 w-3.5" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUploadForService} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setIsAddingService(false);
                  setEditingService(null);
                }}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold bg-cyan-400 text-slate-950 rounded-sm hover:bg-cyan-300"
              >
                <Check className="h-4 w-4" /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Modal */}
      {(isAddingJournal || editingJournal) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/50 rounded-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-cyan-300 uppercase">
                {isAddingJournal ? 'Add Journal Article' : 'Edit Journal Article'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingJournal(false);
                  setEditingJournal(null);
                }}
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">TITLE</label>
                <input
                  type="text"
                  value={journalForm.title}
                  onChange={(e) => setJournalForm({ ...journalForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">CATEGORY</label>
                  <input
                    type="text"
                    value={journalForm.category}
                    onChange={(e) => setJournalForm({ ...journalForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">DATE</label>
                  <input
                    type="text"
                    value={journalForm.date}
                    onChange={(e) => setJournalForm({ ...journalForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">READ TIME</label>
                  <input
                    type="text"
                    value={journalForm.readTime}
                    onChange={(e) => setJournalForm({ ...journalForm, readTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">EXCERPT / SUMMARY</label>
                <textarea
                  rows={3}
                  value={journalForm.excerpt}
                  onChange={(e) => setJournalForm({ ...journalForm, excerpt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">COVER IMAGE URL / UPLOAD</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={journalForm.image}
                    onChange={(e) => setJournalForm({ ...journalForm, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                  />
                  <label className="cursor-pointer flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded text-xs font-mono text-cyan-300 hover:bg-cyan-400 hover:text-slate-950">
                    <Upload className="h-3.5 w-3.5" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUploadForJournal} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setIsAddingJournal(false);
                  setEditingJournal(null);
                }}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJournal}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold bg-cyan-400 text-slate-950 rounded-sm hover:bg-cyan-300"
              >
                <Check className="h-4 w-4" /> Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover Image Following Cursor */}
      {hoveredLink && (
        <div
          className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            left: `${mousePos.x + 120}px`,
            top: `${mousePos.y - 60}px`,
          }}
        >
          <div className="w-56 rounded-[2px] bg-slate-950 p-2 border border-slate-700 shadow-2xl backdrop-blur-md">
            <div className="aspect-[4/3] overflow-hidden rounded-[1px]">
              <img
                src={hoveredLink.image}
                alt={hoveredLink.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

