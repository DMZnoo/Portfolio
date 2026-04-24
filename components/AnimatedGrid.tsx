"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let cellSize = 24;
    let columns = 0;
    let rows = 0;
    let time = 0;
    let lastSpawn = 0;
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };
    const characters = ["0", "1", "/", "\\", "|", "-", "+", ".", ":", "<", ">", "{", "}"];
    const streams: {
      column: number;
      head: number;
      speed: number;
      length: number;
      seed: number;
      maxRow: number;
      intensity: number;
    }[] = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cellSize = w < 640 ? 19 : 24;
      columns = Math.ceil(w / cellSize) + 2;
      rows = Math.ceil(h / cellSize) + 2;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnStream(now: number, force = false) {
      if (reduceMotion || !mouse.active || columns <= 0) return;

      const column = Math.max(0, Math.min(columns - 1, Math.floor(mouse.targetX / cellSize)));
      if (!force && now - lastSpawn < 86) return;

      [-1, 0, 1].forEach((columnOffset) => {
        const streamColumn = column + columnOffset;
        if (streamColumn < 0 || streamColumn >= columns) return;

        const isCenter = columnOffset === 0;
        streams.push({
          column: streamColumn,
          head: -Math.random() * (isCenter ? 2.2 : 4.2),
          speed: (isCenter ? 0.38 : 0.3) + Math.random() * 0.16,
          length: (isCenter ? 12 : 8) + Math.floor(Math.random() * 7),
          seed: Math.random() * 1000 + columnOffset * 97,
          maxRow: Math.max(4, Math.ceil(mouse.targetY / cellSize) + (isCenter ? 4 : 2)),
          intensity: isCenter ? 1 : 0.48,
        });
      });
      lastSpawn = now;
    }

    function onMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
      spawnStream(performance.now(), true);
    }

    function onLeave() {
      mouse.active = false;
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    function seededNoise(x: number, y: number) {
      return Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      if (!reduceMotion) {
        time += 0.012;
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        spawnStream(performance.now());
      }

      ctx.font = `${w < 640 ? 10 : 11}px var(--font-mono), ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          const baseX = col * cellSize - cellSize * 0.5;
          const baseY = row * cellSize - cellSize * 0.5;
          const noise = seededNoise(col, row);
          const drift = reduceMotion ? 0 : Math.sin(time + noise) * 1.2;
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const distance = Math.hypot(dx, dy);
          const influence = mouse.active ? Math.max(0, 1 - distance / 180) : 0;
          const push = influence * 3;
          const angle = Math.atan2(dy, dx);
          const x = baseX + Math.cos(angle) * push;
          const y = baseY + Math.sin(angle) * push + drift;
          const cycle = reduceMotion ? 0 : time * 14;
          const index = Math.abs(Math.floor(noise + cycle + influence * 10)) % characters.length;
          const alpha = 0.03 + influence * 0.16 + (Math.sin(noise + time) + 1) * 0.006;

          ctx.fillStyle = `rgba(148, 211, 229, ${alpha})`;
          ctx.fillText(characters[index], x, y);
        }
      }

      for (let i = streams.length - 1; i >= 0; i -= 1) {
        const stream = streams[i];
        stream.head += stream.speed;

        for (let offset = 0; offset < stream.length; offset += 1) {
          const row = Math.floor(stream.head - offset);
          if (row < 0 || row >= rows || row > stream.maxRow) continue;

          const x = stream.column * cellSize + cellSize * 0.5;
          const y = row * cellSize + cellSize * 0.5;
          const charIndex =
            Math.abs(Math.floor(stream.seed + stream.column * 7 + row * 13 + time * 18)) %
            characters.length;
          const sequence = Math.max(0, 1 - Math.abs(stream.head - row) / 1.7);
          const tail = Math.max(0, 1 - offset / stream.length);
          const alpha = (0.05 + sequence * 0.44 + tail * 0.16) * stream.intensity;

          ctx.fillStyle =
            offset === 0
              ? `rgba(226, 252, 255, ${Math.min(0.78, alpha + 0.1 * stream.intensity)})`
              : `rgba(38, 200, 235, ${Math.min(0.6, alpha)})`;
          ctx.fillText(characters[charIndex], x, y);
        }

        if (stream.head - stream.length > stream.maxRow + 2) {
          streams.splice(i, 1);
        }
      }

      if (streams.length > 120) {
        streams.splice(0, streams.length - 120);
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 block h-dvh w-dvw"
    />
  );
}
