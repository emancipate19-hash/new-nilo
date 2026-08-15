import React, { useRef, useEffect, useState } from 'react';
import { CursorContextState } from '../types';
import { Sun, Layers, RotateCcw, Eye, Compass } from 'lucide-react';

interface Interactive3DModelProps {
  setCursorContext: (context: CursorContextState) => void;
  reducedMotion: boolean;
}

export const Interactive3DModel: React.FC<Interactive3DModelProps> = ({
  setCursorContext,
  reducedMotion
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 3D Orbital rotation angles
  const rotX = useRef(-0.4); // elevation
  const rotY = useRef(0.8);  // azimuth
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Model controls
  const [wireframeMode, setWireframeMode] = useState(false);
  const [sunAngle, setSunAngle] = useState(45); // degrees
  const [explodedView, setExplodedView] = useState(0); // 0 to 100 explosion factor

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define 3D Building geometry (Cantilever Villa Structure)
    // Slabs, structural columns, cantilever projection, central core
    const createBuildingGeometry = () => {
      const scale = 110;
      const exp = (explodedView / 100) * 40; // explosion separation

      // Base Podia / Terrain
      const terrainSlab = [
        [-1.8, -1.2 - exp * 0.1, -1.8], [1.8, -1.2 - exp * 0.1, -1.8],
        [1.8, -1.2 - exp * 0.1, 1.8], [-1.8, -1.2 - exp * 0.1, 1.8]
      ];

      // Ground Floor Mass
      const groundFloor = [
        [-1.2, -1.2, -1.2], [1.2, -1.2, -1.2], [1.2, -0.2, -1.2], [-1.2, -0.2, -1.2],
        [-1.2, -1.2, 1.2], [1.2, -1.2, 1.2], [1.2, -0.2, 1.2], [-1.2, -0.2, 1.2]
      ];

      // Cantilever Level 02 (Projecting dramatically along X-axis +2.4)
      const cantileverLevel = [
        [-0.8, 0.2 + exp * 0.8, -1.0], [2.4, 0.2 + exp * 0.8, -1.0], [2.4, 1.1 + exp * 0.8, -1.0], [-0.8, 1.1 + exp * 0.8, -1.0],
        [-0.8, 0.2 + exp * 0.8, 1.0], [2.4, 0.2 + exp * 0.8, 1.0], [2.4, 1.1 + exp * 0.8, 1.0], [-0.8, 1.1 + exp * 0.8, 1.0]
      ];

      // Roof Canopy / Timber Fins
      const roofCanopy = [
        [-1.0, 1.3 + exp * 1.5, -1.1], [2.6, 1.3 + exp * 1.5, -1.1], [2.6, 1.45 + exp * 1.5, -1.1], [-1.0, 1.45 + exp * 1.5, -1.1],
        [-1.0, 1.3 + exp * 1.5, 1.1], [2.6, 1.3 + exp * 1.5, 1.1], [2.6, 1.45 + exp * 1.5, 1.1], [-1.0, 1.45 + exp * 1.5, 1.1]
      ];

      return { terrainSlab, groundFloor, cantileverLevel, roofCanopy, scale };
    };

    // 3D Point projection function
    const project3D = (
      x: number, y: number, z: number,
      rx: number, ry: number,
      centerX: number, centerY: number,
      scale: number
    ) => {
      // Rotate around Y axis (azimuth)
      const x1 = x * Math.cos(ry) + z * Math.sin(ry);
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry);

      // Rotate around X axis (elevation)
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

      // Perspective scale factor
      const perspective = 600 / (600 + z2);

      return {
        px: centerX + x1 * scale * perspective,
        py: centerY - y2 * scale * perspective,
        depth: z2
      };
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle grid floor background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;

      const centerX = width / 2;
      const centerY = height / 2 + 10;

      // Draw grid ground plane
      const gridRadius = 3;
      for (let i = -gridRadius; i <= gridRadius; i += 0.6) {
        const p1 = project3D(i, -1.3, -gridRadius, rotX.current, rotY.current, centerX, centerY, 100);
        const p2 = project3D(i, -1.3, gridRadius, rotX.current, rotY.current, centerX, centerY, 100);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project3D(-gridRadius, -1.3, i, rotX.current, rotY.current, centerX, centerY, 100);
        const p4 = project3D(gridRadius, -1.3, i, rotX.current, rotY.current, centerX, centerY, 100);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Draw building geometries
      const { groundFloor, cantileverLevel, roofCanopy, scale } = createBuildingGeometry();

      const drawBox = (vertices: number[][], strokeColor: string, fillColor: string) => {
        const projected = vertices.map((v) =>
          project3D(v[0], v[1], v[2], rotX.current, rotY.current, centerX, centerY, scale)
        );

        // Box faces (6 faces)
        const faces = [
          [0, 1, 2, 3], // front
          [4, 5, 6, 7], // back
          [0, 1, 5, 4], // bottom
          [2, 3, 7, 6], // top
          [0, 3, 7, 4], // left
          [1, 2, 6, 5]  // right
        ];

        // Sort faces by average depth for correct rendering
        faces.sort((a, b) => {
          const depthA = (projected[a[0]].depth + projected[a[1]].depth + projected[a[2]].depth + projected[a[3]].depth) / 4;
          const depthB = (projected[b[0]].depth + projected[b[1]].depth + projected[b[2]].depth + projected[b[3]].depth) / 4;
          return depthB - depthA;
        });

        faces.forEach((face) => {
          ctx.beginPath();
          ctx.moveTo(projected[face[0]].px, projected[face[0]].py);
          ctx.lineTo(projected[face[1]].px, projected[face[1]].py);
          ctx.lineTo(projected[face[2]].px, projected[face[2]].py);
          ctx.lineTo(projected[face[3]].px, projected[face[3]].py);
          ctx.closePath();

          if (!wireframeMode) {
            ctx.fillStyle = fillColor;
            ctx.fill();
          }

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = wireframeMode ? 1.5 : 1;
          ctx.stroke();
        });
      };

      // Render Ground Floor (Dark Concrete Monolith)
      drawBox(
        groundFloor,
        'rgba(165, 243, 252, 0.4)',
        'rgba(15, 23, 42, 0.85)'
      );

      // Render Cantilever Volume (Architectural Highlight Projection)
      drawBox(
        cantileverLevel,
        'rgba(56, 189, 248, 0.8)',
        'rgba(30, 41, 59, 0.88)'
      );

      // Render Roof Canopy / Louver Plane
      drawBox(
        roofCanopy,
        'rgba(224, 247, 252, 0.9)',
        'rgba(14, 116, 144, 0.3)'
      );

      // Draw Sun Direction Vector Line
      const sunRad = (sunAngle * Math.PI) / 180;
      const sunX = Math.cos(sunRad) * 3;
      const sunY = Math.sin(sunRad) * 2 + 1.5;
      const sunZ = 2;
      const sunPt = project3D(sunX, sunY, sunZ, rotX.current, rotY.current, centerX, centerY, scale);

      // Sun vector line
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sunPt.px, sunPt.py);
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.6)';
      ctx.stroke();
      ctx.setLineDash([]);

      // Sun point glow
      ctx.beginPath();
      ctx.arc(sunPt.px, sunPt.py, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Auto rotation if not dragging and motion is not reduced
      if (!isDragging.current && !reducedMotion) {
        rotY.current += 0.003;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [wireframeMode, sunAngle, explodedView, reducedMotion]);

  // Mouse drag logic for 360 orbital view
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    setCursorContext({ mode: 'rotate', text: 'ORBITING', intensity: 'high' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    rotY.current += deltaX * 0.008;
    rotX.current = Math.max(-1.2, Math.min(0.2, rotX.current + deltaY * 0.008));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setCursorContext({ mode: 'rotate', text: 'ROTATE 360°' });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-slate-950/80 border border-slate-800 p-4 md:p-8 backdrop-blur-lg">
      {/* Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-cyan-400 animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase font-semibold">
              3D COMPUTATIONAL MASSING MODEL
            </span>
          </div>
          <h3 className="text-sm font-mono text-slate-200 mt-1">
            TERRAIN CANTILEVER VILLA — DIGITAL TWIN
          </h3>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-mono transition-all ${
              wireframeMode
                ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/50 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            {wireframeMode ? 'WIREFRAME' : 'SOLID SHADED'}
          </button>

          {/* Reset Orbit */}
          <button
            onClick={() => {
              rotX.current = -0.4;
              rotY.current = 0.8;
            }}
            className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-mono bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            RESET ORBIT
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Orbit Stage */}
      <div className="relative h-[360px] md:h-[420px] w-full rounded-sm bg-gradient-to-b from-slate-950/60 to-slate-900/40">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={() => setCursorContext({ mode: 'rotate', text: 'ROTATE 360°', intensity: 'medium' })}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />

        {/* Overlay Compass Badge */}
        <div className="absolute top-4 left-4 pointer-events-none rounded-sm bg-slate-950/80 px-2.5 py-1.5 border border-slate-800 text-[10px] font-mono text-cyan-300 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>REAL-TIME SHADOW ANALYZER</span>
        </div>

        {/* Orbit hint label */}
        <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-cyan-400" />
          <span>CLICK & DRAG TO ORBIT ARCHITECTURE</span>
        </div>
      </div>

      {/* Exploded View & Solar Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <Sun className="h-4 w-4 text-amber-300" />
          <span className="w-28 text-[11px] text-slate-300">SOLAR POSITION</span>
          <input
            type="range"
            min="0"
            max="180"
            value={sunAngle}
            onChange={(e) => setSunAngle(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="w-10 text-right text-cyan-300">{sunAngle}°</span>
        </div>

        <div className="flex items-center gap-3">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span className="w-28 text-[11px] text-slate-300">EXPLODED SLABS</span>
          <input
            type="range"
            min="0"
            max="100"
            value={explodedView}
            onChange={(e) => setExplodedView(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="w-10 text-right text-cyan-300">{explodedView}%</span>
        </div>
      </div>
    </div>
  );
};
