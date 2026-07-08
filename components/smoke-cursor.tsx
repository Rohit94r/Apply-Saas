"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  life: number;
  maxLife: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  type: "trail" | "blast" | "idle";
  colorShift: number; // -1 to 1, slight color variation
}

export function SmokeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 });
  const isMovingRef = useRef(false);
  const moveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const lastClickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Improved spawn for cursor movement — more natural smoke trail
    const spawnTrailParticles = (x: number, y: number, dx: number, dy: number) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < 6) return;
      lastSpawnRef.current = now;

      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = speed > 8 ? 3 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2);
      const dirX = speed > 0 ? dx / speed : 0;
      const dirY = speed > 0 ? dy / speed : 0;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 3;
        const life = 600 + Math.random() * 700;
        const maxSize = 7 + Math.random() * 14;
        const spreadAngle = (Math.random() - 0.5) * Math.PI * 0.5;
        const spreadSpeed = 0.25 + Math.random() * 0.5;
        const backDrift = 0.08 + Math.random() * 0.12;

        particlesRef.current.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          vx: -dirX * backDrift + Math.cos(spreadAngle) * spreadSpeed,
          vy: -dirY * backDrift + Math.sin(spreadAngle) * spreadSpeed - 0.15 - Math.random() * 0.25,
          size: 3 + Math.random() * 4,
          maxSize,
          life,
          maxLife: life,
          opacity: 0.35 + Math.random() * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          type: "trail",
          colorShift: (Math.random() - 0.5) * 0.15,
        });
      }

      if (particlesRef.current.length > 350) {
        particlesRef.current.splice(0, particlesRef.current.length - 350);
      }
    };

    // Click blast — small subtle puff
    const spawnBlast = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastClickRef.current < 200) return;
      lastClickRef.current = now;

      const count = 10 + Math.floor(Math.random() * 8); // 10-18 particles only

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 1.8;
        const life = 350 + Math.random() * 500;
        const maxSize = 5 + Math.random() * 12;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6 - Math.random() * 0.5,
          size: 2 + Math.random() * 3,
          maxSize,
          life,
          maxLife: life,
          opacity: 0.2 + Math.random() * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.025,
          type: "blast",
          colorShift: (Math.random() - 0.5) * 0.3,
        });
      }

      if (particlesRef.current.length > 350) {
        particlesRef.current.splice(0, particlesRef.current.length - 350);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current.prevX = prevX;
      mouseRef.current.prevY = prevY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      isMovingRef.current = true;

      if (prevX >= 0) {
        spawnTrailParticles(e.clientX, e.clientY, e.clientX - prevX, e.clientY - prevY);
      }

      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 100);
    };

    const onClick = (e: MouseEvent) => {
      spawnBlast(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    const noise = (x: number, y: number, t: number) => {
      return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) * 0.5 +
             Math.sin(x * 0.02 - t * 1.3) * 0.3;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const isDark = document.documentElement.classList.contains("dark");
      const time = Date.now() * 0.001;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 16;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const progress = 1 - p.life / p.maxLife;
        p.rotation += p.rotSpeed;

        // Turbulence / noise-based drift for organic movement
        const turbX = noise(p.x, p.y, time) * 0.4;
        const turbY = noise(p.y, p.x, time + 100) * 0.3;

        p.x += p.vx + turbX;
        p.y += p.vy + turbY;

        // Friction differs by type
        const friction = p.type === "blast" ? 0.96 : 0.985;
        p.vx *= friction;
        p.vy *= friction;

        // Upward buoyancy
        const buoyancy = p.type === "blast" ? 0.025 : 0.02;
        p.vy -= buoyancy;

        // Size expansion — blast expands faster then slows
        let currentSize: number;
        if (p.type === "blast") {
          const blastProgress = Math.min(progress * 2, 1);
          currentSize = p.size + (p.maxSize - p.size) * blastProgress;
        } else {
          currentSize = p.size + (p.maxSize - p.size) * Math.pow(progress, 0.7);
        }

        // Fade curve
        let alpha = p.opacity;
        if (progress > 0.5) {
          alpha = p.opacity * Math.pow(1 - (progress - 0.5) / 0.5, 1.2);
        }
        if (progress < 0.08) {
          alpha = p.opacity * (progress / 0.08);
        }

        if (alpha <= 0.005) continue;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw layered smoke puff for realism
        const layers = p.type === "blast" ? 2 : 1;
        for (let l = 0; l < layers; l++) {
          const layerSize = currentSize * (1 + l * 0.25);
          const layerAlpha = alpha * (1 - l * 0.25);
          const offset = l * 2;

          const gradient = ctx.createRadialGradient(
            offset, offset, 0,
            offset, offset, layerSize
          );

          if (isDark) {
            // Premium silver-white smoke for dark mode
            const warm = 210 + p.colorShift * 15;
            gradient.addColorStop(0, `rgba(${warm + 10}, ${warm + 8}, ${warm + 5}, ${layerAlpha * 1.4})`);
            gradient.addColorStop(0.3, `rgba(${warm - 15}, ${warm - 12}, ${warm - 8}, ${layerAlpha * 0.65})`);
            gradient.addColorStop(0.65, `rgba(${warm - 50}, ${warm - 45}, ${warm - 38}, ${layerAlpha * 0.2})`);
            gradient.addColorStop(1, `rgba(${warm - 70}, ${warm - 65}, ${warm - 58}, 0)`);
          } else {
            // Rich charcoal smoke for light mode — higher contrast
            const cool = 90 + p.colorShift * 20;
            gradient.addColorStop(0, `rgba(${cool + 5}, ${cool + 8}, ${cool + 12}, ${layerAlpha * 1.1})`);
            gradient.addColorStop(0.3, `rgba(${cool + 25}, ${cool + 28}, ${cool + 32}, ${layerAlpha * 0.5})`);
            gradient.addColorStop(0.65, `rgba(${cool + 55}, ${cool + 58}, ${cool + 62}, ${layerAlpha * 0.15})`);
            gradient.addColorStop(1, `rgba(${cool + 75}, ${cool + 78}, ${cool + 82}, 0)`);
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          // Soft oval for natural smoke
          const ovalH = layerSize * (0.88 + Math.sin(time * 2 + i) * 0.08);
          ctx.ellipse(0, 0, layerSize, ovalH, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Idle wisp when stopped
      if (!isMovingRef.current && particles.length < 35 && mouseRef.current.x >= 0) {
        const now = Date.now();
        if (now - lastSpawnRef.current > 160) {
          lastSpawnRef.current = now;
          particles.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 3,
            y: mouseRef.current.y + (Math.random() - 0.5) * 3,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -0.1 - Math.random() * 0.18,
            size: 2 + Math.random() * 2.5,
            maxSize: 5 + Math.random() * 7,
            life: 450 + Math.random() * 450,
            maxLife: 450 + Math.random() * 450,
            opacity: 0.18 + Math.random() * 0.12,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.008,
            type: "idle",
            colorShift: (Math.random() - 0.5) * 0.12,
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animFrameRef.current);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
