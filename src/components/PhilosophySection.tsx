import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Check, X, Sun } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { PhilosophyBlock } from '../types';

export const PhilosophySection: React.FC = () => {
  const {
    philosophyBlocks,
    addPhilosophyBlock,
    updatePhilosophyBlock,
    deletePhilosophyBlock,
    isAdminMode
  } = useStudio();

  const [editingBlock, setEditingBlock] = useState<PhilosophyBlock | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state
  const [formData, setFormData] = useState<PhilosophyBlock>({
    id: '',
    badge: '',
    title: '',
    paragraph: '',
    bullets: [
      { title: '', description: '' },
      { title: '', description: '' }
    ]
  });

  const handleOpenAdd = () => {
    setFormData({
      id: `phil-${Date.now()}`,
      badge: `0${philosophyBlocks.length + 1} — SPATIAL MANIFESTO`,
      title: 'NEW PHILOSOPHY MANIFESTO',
      paragraph: 'Enter the architectural manifesto and design philosophy for this section...',
      bullets: [
        { title: 'SUSTAINABLE DESIGN', description: 'Description of key architectural principle.' },
        { title: 'LIGHT & MATERIALITY', description: 'Description of structural execution.' }
      ]
    });
    setIsAddingNew(true);
    setEditingBlock(null);
  };

  const handleOpenEdit = (block: PhilosophyBlock) => {
    setFormData(JSON.parse(JSON.stringify(block)));
    setEditingBlock(block);
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (isAddingNew) {
      addPhilosophyBlock(formData);
    } else if (editingBlock) {
      updatePhilosophyBlock(formData);
    }

    setIsAddingNew(false);
    setEditingBlock(null);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase font-semibold">
              ATELIER PHILOSOPHY & SPATIAL MANIFESTO
            </span>
          </div>
          <h2 className="text-2xl font-mono font-bold text-slate-100 uppercase mt-1">
            DESIGN PRINCIPLES & MATERIAL POETICS
          </h2>
        </div>
      </div>

      {/* Render All Philosophy Blocks */}
      <div className="space-y-12">
        {philosophyBlocks.map((block, index) => (
          <section
            key={block.id}
            id={index === 0 ? 'philosophy' : index === 1 ? 'manifesto' : `philosophy-${index}`}
            className="relative rounded-sm bg-slate-900/60 border border-slate-800 p-8 md:p-14 backdrop-blur-md group transition-all hover:border-slate-700"
          >
            <div className={`max-w-3xl ${index % 2 === 1 ? 'ml-auto' : ''}`}>
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <Sun className="h-4 w-4" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold">
                  {block.badge}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-tight text-slate-100 uppercase leading-snug">
                {block.title}
              </h2>

              <p className="mt-6 text-sm md:text-base font-mono leading-relaxed text-slate-300">
                {block.paragraph}
              </p>

              {block.bullets && block.bullets.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  {block.bullets.map((bullet, bIdx) => (
                    <div key={bIdx}>
                      <span className="text-amber-300 font-bold uppercase">{bullet.title}</span>
                      <p className="mt-1 text-slate-400 text-[11px]">{bullet.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {(isAddingNew || editingBlock) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/50 rounded-sm p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase">
                {isAddingNew ? 'Add New Philosophy Block' : 'Edit Philosophy Block'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingBlock(null);
                }}
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  SECTION BADGE
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  HEADLINE TITLE
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  MANIFESTO PARAGRAPH
                </label>
                <textarea
                  rows={4}
                  value={formData.paragraph}
                  onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>

              {/* Bullets */}
              <div className="space-y-3 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    BULLET POINTS / KEY COLUMNS
                  </span>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        bullets: [...formData.bullets, { title: 'NEW KEY POINT', description: 'Description...' }]
                      })
                    }
                    className="text-[10px] font-mono text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Bullet
                  </button>
                </div>

                {formData.bullets.map((b, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-400">Bullet #{idx + 1}</span>
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            bullets: formData.bullets.filter((_, i) => i !== idx)
                          })
                        }
                        className="text-rose-400 text-[10px] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Bullet Title"
                      value={b.title}
                      onChange={(e) => {
                        const newB = [...formData.bullets];
                        newB[idx].title = e.target.value;
                        setFormData({ ...formData, bullets: newB });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                    />
                    <textarea
                      rows={2}
                      placeholder="Bullet Description"
                      value={b.description}
                      onChange={(e) => {
                        const newB = [...formData.bullets];
                        newB[idx].description = e.target.value;
                        setFormData({ ...formData, bullets: newB });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingBlock(null);
                }}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold bg-amber-400 text-slate-950 rounded-sm hover:bg-amber-300"
              >
                <Check className="h-4 w-4" /> Save Philosophy Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

