import React, { useState } from 'react';
import { Project, CursorContextState } from '../types';
import { Target, Sparkles, MoveRight } from 'lucide-react';

interface InteractiveFloorPlanProps {
  project: Project;
  setCursorContext: (context: CursorContextState) => void;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  project,
  setCursorContext
}) => {
  const [activeSpotId, setActiveSpotId] = useState<string>(
    project.floorPlan.spots[0]?.id || ''
  );

  const activeSpot = project.floorPlan.spots.find((s) => s.id === activeSpotId) || project.floorPlan.spots[0];

  return (
    <div className="rounded-sm bg-slate-950/90 border border-slate-800 p-6 md:p-8 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase font-semibold">
              INTERACTIVE BLUEPRINT & SPATIAL MATRIX
            </span>
          </div>
          <h3 className="text-sm font-mono text-slate-100 mt-1">
            {project.floorPlan.title}
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          HOVER HOTSPOTS TO ILLUMINATE SPATIAL MATRIX
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Floorplan Canvas View */}
        <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden rounded-sm bg-slate-900 border border-slate-800 group">
          {/* Blueprint Image */}
          <img
            src={project.floorPlan.image}
            alt={project.floorPlan.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover mix-blend-luminosity opacity-40 filter contrast-125 transition-all duration-500 group-hover:opacity-60"
          />

          {/* Blueprint Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Active Spotlight Cone on Floor Plan */}
          {activeSpot && (
            <div
              className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
              style={{
                left: `${activeSpot.x}%`,
                top: `${activeSpot.y}%`,
                background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(165,243,252,0.1) 45%, transparent 70%)',
                mixBlendMode: 'screen'
              }}
            />
          )}

          {/* Hotspot Markers */}
          {project.floorPlan.spots.map((spot) => {
            const isActive = spot.id === activeSpotId;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveSpotId(spot.id)}
                onMouseEnter={() => {
                  setActiveSpotId(spot.id);
                  setCursorContext({ mode: 'floorplan', text: 'INSPECT ROOM' });
                }}
                onMouseLeave={() => setCursorContext({ mode: 'default' })}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Ping Ring */}
                  <span
                    className={`absolute inline-flex h-8 w-8 rounded-full ${
                      isActive ? 'bg-cyan-400/40 animate-ping' : 'bg-cyan-500/20'
                    }`}
                  />

                  {/* Hotspot Center Dot */}
                  <div
                    className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-400 border-white text-slate-950 scale-125 shadow-[0_0_15px_#38bdf8]'
                        : 'bg-slate-950 border-cyan-400/60 text-cyan-300 hover:scale-110'
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                  </div>

                  {/* Label tooltip */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[2px] bg-slate-950/90 px-2 py-1 text-[9px] font-mono tracking-wider text-cyan-200 border border-slate-700/80 shadow-lg pointer-events-none">
                    {spot.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Room Specifications Details */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full bg-slate-900/60 border border-slate-800 p-6 rounded-sm">
          {activeSpot ? (
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                  SPATIAL ROOM MATRIX
                </span>
              </div>

              <h4 className="text-base font-mono font-bold text-slate-100 tracking-wide">
                {activeSpot.label}
              </h4>

              <div className="mt-3 inline-block rounded-[2px] bg-cyan-950/60 px-2.5 py-1 text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/30">
                AREA: {activeSpot.area}
              </div>

              <p className="mt-4 text-xs font-mono leading-relaxed text-slate-300">
                {activeSpot.description}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>ACOUSTICS:</span>
                  <span className="text-slate-200">NRC 0.85 Timber Louvers</span>
                </div>
                <div className="flex justify-between">
                  <span>FACADE GLAZING:</span>
                  <span className="text-slate-200">Triple Structural Glass</span>
                </div>
                <div className="flex justify-between">
                  <span>THERMAL MASS:</span>
                  <span className="text-slate-200">600mm Board-Formed Concrete</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs font-mono text-slate-500 text-center py-12">
              SELECT A HOTSPOT ON THE BLUEPRINT TO INSPECT
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>ARCHITECTURAL DRAWING NO. 04</span>
            <div className="flex items-center gap-1 text-cyan-400">
              <span>EXPLORE NEXT</span>
              <MoveRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
