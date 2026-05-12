"use client";

import { useEffect, useRef } from "react";

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uPaper;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform vec3 uAccent2;
  varying vec2 vUv;

  // Simplex noise — Ashima Arts / Stefan Gustavson
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float contour(float n, float lines, float width) {
    float v = fract(n * lines);
    float d = min(v, 1.0 - v);
    return 1.0 - smoothstep(0.0, width, d);
  }

  void main() {
    float ar = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(ar, 1.0);
    vec2 ptr = (uPointer - 0.5) * vec2(ar, 1.0);
    vec2 q = p + (p - ptr) * 0.05;

    float n = snoise(q * 1.4 + vec2(0.0, uTime * 0.035));
    n += 0.5 * snoise(q * 2.9 + vec2(uTime * 0.045, 0.0));
    n += 0.25 * snoise(q * 5.7 + vec2(-uTime * 0.03, uTime * 0.02));
    n = n * 0.45 + 0.5;

    float line = contour(n, 11.0, 0.025);
    vec3 col = mix(uPaper, uInk, line * 0.32);

    // bloomed pink lissajous dot
    vec2 dot1 = vec2(sin(uTime * 0.31) * 0.42, cos(uTime * 0.43) * 0.26) * vec2(ar, 1.0);
    float dist1 = length(p - dot1);
    float core1 = smoothstep(0.018, 0.005, dist1);
    float halo1 = exp(-dist1 * 12.0);
    col = mix(col, uAccent, core1);
    col += uAccent * halo1 * 0.30;

    // mint companion dot on a slower path
    vec2 dot2 = vec2(cos(uTime * 0.21 + 1.3) * 0.32, sin(uTime * 0.27 + 0.6) * 0.22) * vec2(ar, 1.0);
    float dist2 = length(p - dot2);
    float core2 = smoothstep(0.014, 0.004, dist2);
    float halo2 = exp(-dist2 * 13.0);
    col = mix(col, uAccent2, core2);
    col += uAccent2 * halo2 * 0.22;

    // soft pink vignette tint
    float vign = smoothstep(1.1, 0.4, length(p));
    col = mix(uPaper, col, 0.40 + 0.60 * vign);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const COLORS = {
  paper: [1.0, 0.98, 0.984] as [number, number, number],
  ink: [0.176, 0.106, 0.145] as [number, number, number],
  accent: [0.894, 0.353, 0.573] as [number, number, number],
  accent2: [0.533, 0.851, 0.737] as [number, number, number],
};

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!hasWebGL()) return;

    let raf = 0;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const ogl = await import("ogl");
      if (disposed || !canvasRef.current) return;
      const { Renderer, Program, Mesh, Triangle } = ogl;

      const renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        alpha: false,
        antialias: false,
      });
      const gl = renderer.gl;
      gl.clearColor(COLORS.paper[0], COLORS.paper[1], COLORS.paper[2], 1);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [canvas.clientWidth, canvas.clientHeight] },
          uPointer: { value: [0.5, 0.45] },
          uPaper: { value: COLORS.paper },
          uInk: { value: COLORS.ink },
          uAccent: { value: COLORS.accent },
          uAccent2: { value: COLORS.accent2 },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      resize();

      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        program.uniforms.uPointer.value = [
          (e.clientX - rect.left) / rect.width,
          1 - (e.clientY - rect.top) / rect.height,
        ];
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let start = performance.now();
      const tick = (t: number) => {
        program.uniforms.uTime.value = (t - start) / 1000;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(tick);
      };

      if (reduceMotion) {
        program.uniforms.uTime.value = 12;
        renderer.render({ scene: mesh });
      } else {
        start = performance.now();
        raf = requestAnimationFrame(tick);
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !raf && !reduceMotion) {
              start = performance.now() - program.uniforms.uTime.value * 1000;
              raf = requestAnimationFrame(tick);
            } else if (!e.isIntersecting && raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onMove, { passive: true });

      cleanup = () => {
        io.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="hero-canvas h-full w-full"
    />
  );
}
