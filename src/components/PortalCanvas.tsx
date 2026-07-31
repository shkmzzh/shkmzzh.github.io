import { useEffect, useRef } from 'react';

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  drift: number;
  hue: number;
};

const PARTICLE_COUNT = 180;

export default function PortalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      angle: (Math.PI * 2 * index) / PARTICLE_COUNT + Math.random() * 0.8,
      radius: 0.18 + Math.random() * 0.82,
      speed: 0.0018 + Math.random() * 0.004,
      size: 0.9 + Math.random() * 2.8,
      drift: Math.random() > 0.5 ? 1 : -1,
      hue: 86 + Math.random() * 46,
    }));

    let width = 0;
    let height = 0;
    let lastTime = 0;
    let animationId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawIrregularEllipse = (
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      phase: number,
      color: string,
      blur: number,
    ) => {
      ctx.save();
      ctx.beginPath();

      const points = 220;
      for (let i = 0; i <= points; i += 1) {
        const angle = (Math.PI * 2 * i) / points;
        const wave =
          Math.sin(angle * 3 + phase) * 0.075 +
          Math.sin(angle * 7 - phase * 0.74) * 0.044 +
          Math.cos(angle * 13 + phase * 0.55) * 0.028;
        const x = cx + Math.cos(angle) * rx * (1 + wave);
        const y = cy + Math.sin(angle) * ry * (1 + wave);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(10, Math.min(rx, ry) * 0.13);
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.restore();
    };

    const drawLightning = (cx: number, cy: number, rx: number, ry: number, time: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let bolt = 0; bolt < 14; bolt += 1) {
        const start = time * 0.0022 + bolt * 0.62;
        const span = 0.36 + Math.sin(time * 0.0014 + bolt) * 0.16;
        ctx.beginPath();

        for (let i = 0; i < 10; i += 1) {
          const t = i / 9;
          const angle = start + span * t;
          const jitter = Math.sin(time * 0.018 + bolt * 11 + i * 2.8) * 14;
          const radial = 1.02 + Math.sin(time * 0.01 + i + bolt) * 0.045;
          const x = cx + Math.cos(angle) * (rx * radial + jitter);
          const y = cy + Math.sin(angle) * (ry * radial + jitter * 0.42);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = bolt % 3 === 0
          ? 'rgba(250, 255, 232, 0.92)'
          : bolt % 3 === 1
            ? 'rgba(185, 255, 74, 0.86)'
            : 'rgba(74, 255, 159, 0.74)';
        ctx.lineWidth = bolt % 3 === 0 ? 3.2 : 1.8;
        ctx.shadowColor = bolt % 3 === 2 ? '#4bffae' : '#baff38';
        ctx.shadowBlur = 22;
        ctx.stroke();

        if (bolt % 2 === 0) {
          const branchAngle = start + span * 0.55;
          const sx = cx + Math.cos(branchAngle) * rx * 0.95;
          const sy = cy + Math.sin(branchAngle) * ry * 0.95;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(
            sx + Math.cos(branchAngle + 0.7) * 34,
            sy + Math.sin(branchAngle + 0.7) * 28,
          );
          ctx.strokeStyle = 'rgba(246, 255, 218, 0.68)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const draw = (time: number) => {
      const delta = lastTime ? Math.min(32, time - lastTime) : 16;
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height);
      const rx = Math.min(width * 0.31, base * 0.34);
      const ry = Math.min(height * 0.46, base * 0.58);
      const phase = time * 0.00145;

      const backdrop = ctx.createRadialGradient(cx, cy, base * 0.05, cx, cy, base * 0.62);
      backdrop.addColorStop(0, 'rgba(252, 255, 224, 0.96)');
      backdrop.addColorStop(0.18, 'rgba(207, 255, 86, 0.76)');
      backdrop.addColorStop(0.42, 'rgba(58, 231, 74, 0.46)');
      backdrop.addColorStop(0.72, 'rgba(22, 95, 34, 0.22)');
      backdrop.addColorStop(1, 'rgba(4, 18, 8, 0)');
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, width, height);

      drawIrregularEllipse(cx, cy, rx * 1.08, ry * 1.02, phase, 'rgba(165, 255, 62, 0.94)', 36);
      drawIrregularEllipse(cx, cy, rx * 0.86, ry * 0.84, -phase * 1.4, 'rgba(42, 232, 92, 0.72)', 30);
      drawIrregularEllipse(cx, cy, rx * 0.66, ry * 0.64, phase * 1.8, 'rgba(239, 255, 172, 0.66)', 22);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.translate(cx, cy);
      for (let ring = 0; ring < 24; ring += 1) {
        const ringRx = rx * (0.16 + ring * 0.034);
        const ringRy = ry * (0.15 + ring * 0.034);
        const start = phase * (1.6 + ring * 0.035) + ring * 0.42;
        const length = 1.25 + Math.sin(phase * 2 + ring) * 0.32;
        ctx.beginPath();
        ctx.ellipse(0, 0, ringRx, ringRy, Math.sin(phase + ring) * 0.12, start, start + length);
        ctx.strokeStyle = ring % 3 === 0
          ? 'rgba(249, 255, 219, 0.78)'
          : ring % 3 === 1
            ? 'rgba(157, 255, 68, 0.66)'
            : 'rgba(53, 235, 127, 0.54)';
        ctx.lineWidth = Math.max(1.4, base * (0.012 - ring * 0.00022));
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#baff38';
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const particle of particles) {
        particle.angle += particle.speed * delta * particle.drift + 0.006;
        particle.radius -= 0.0019;
        if (particle.radius < 0.1) {
          particle.radius = 1;
          particle.angle = Math.random() * Math.PI * 2;
        }

        const spiral = particle.angle + particle.radius * 7.6 + phase * 2.8;
        const x = cx + Math.cos(spiral) * rx * particle.radius;
        const y = cy + Math.sin(spiral) * ry * particle.radius;
        const alpha = Math.max(0.14, Math.min(0.92, particle.radius));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 72%, ${alpha})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsl(${particle.hue}, 100%, 62%)`;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(rx, ry) * 0.64);
      core.addColorStop(0, 'rgba(255, 255, 245, 0.98)');
      core.addColorStop(0.18, 'rgba(232, 255, 128, 0.92)');
      core.addColorStop(0.46, 'rgba(94, 255, 76, 0.54)');
      core.addColorStop(1, 'rgba(17, 119, 31, 0)');
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.2, ry * 0.26, Math.sin(phase) * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      drawLightning(cx, cy, rx, ry, time);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    animationId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="portal-canvas" aria-hidden="true" />;
}
