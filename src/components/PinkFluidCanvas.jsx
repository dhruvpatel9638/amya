import React, { useEffect, useRef } from 'react';

/**
 * PinkFluidCanvas — Section-specific WebGL/Canvas Pink Fluid Flow.
 * Placed only in the specific sections shown in the video:
 * 1. Hero section background
 * 2. Dark Quote card in Portfolio
 * 3. Final CTA / Footer section
 */
export default function PinkFluidCanvas({ className = '', opacity = 1, isDark = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
    let height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    let isDestroyed = false;

    if (gl) {
      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const createProgram = (vs, fs) => {
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        return program;
      };

      const baseVS = createShader(
        gl.VERTEX_SHADER,
        `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
      );

      // Display shader (renders pink fluid)
      const displayFS = createShader(
        gl.FRAGMENT_SHADER,
        `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uIsDark;

        void main () {
            vec4 c = texture2D(uTexture, vUv);
            float alpha = clamp(c.a * 1.6, 0.0, 0.95);
            vec3 pink = mix(vec3(0.988, 0.278, 0.471), vec3(1.0, 0.65, 0.76), c.r * 0.45);
            
            // If in dark container, make fluid glow vibrantly
            if (uIsDark > 0.5) {
               gl_FragColor = vec4(pink * (c.rgb + 0.2), alpha);
            } else {
               gl_FragColor = vec4(pink * c.rgb, alpha);
            }
        }
      `
      );

      // Splat shader (injects pink dye on mouse movement)
      const splatFS = createShader(
        gl.FRAGMENT_SHADER,
        `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float uAspectRatio;
        uniform vec3 uColor;
        uniform vec2 uPoint;
        uniform float uRadius;

        void main () {
            vec2 p = vUv - uPoint.xy;
            p.x *= uAspectRatio;
            vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
            vec3 base = texture2D(uTarget, vUv).xyz;
            float alpha = exp(-dot(p, p) / uRadius);
            gl_FragColor = vec4(base + splat, max(texture2D(uTarget, vUv).a, alpha * 0.95));
        }
      `
      );

      // Advection / dissipation shader
      const advectionFS = createShader(
        gl.FRAGMENT_SHADER,
        `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 uTexelSize;
        uniform float uDt;
        uniform float uDissipation;

        void main () {
            vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
            gl_FragColor = uDissipation * texture2D(uSource, coord);
        }
      `
      );

      const displayProgram = createProgram(baseVS, displayFS);
      const splatProgram = createProgram(baseVS, splatFS);
      const advectionProgram = createProgram(baseVS, advectionFS);

      const quadBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

      const createFBO = (w, h) => {
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        return {
          texture,
          fbo,
          attach: (id) => {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
          },
        };
      };

      const createDoubleFBO = (w, h) => {
        let fbo1 = createFBO(w, h);
        let fbo2 = createFBO(w, h);
        return {
          read: () => fbo1,
          write: () => fbo2,
          swap: () => {
            const temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
          },
        };
      };

      const simRes = 256;
      let density = createDoubleFBO(simRes, simRes);
      let velocity = createDoubleFBO(simRes, simRes);

      const splatsQueue = [];

      const splat = (x, y, dx, dy, color) => {
        splatsQueue.push({
          x: x / width,
          y: 1.0 - y / height,
          dx: dx * 7.5,
          dy: -dy * 7.5,
          color,
        });
      };

      let lastX = -1;
      let lastY = -1;

      const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        // Only react if mouse is within this section's bounding rectangle
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (lastX >= 0 && lastY >= 0) {
            const dx = x - lastX;
            const dy = y - lastY;
            const dist = Math.hypot(dx, dy);

            if (dist > 1) {
              splat(x, y, dx, dy, [0.988, 0.278, 0.471]);
            }
          }

          lastX = x;
          lastY = y;
        } else {
          lastX = -1;
          lastY = -1;
        }
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const onResize = () => {
        if (!parent) return;
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      };
      window.addEventListener('resize', onResize);

      let lastTime = performance.now();

      const render = () => {
        if (isDestroyed) return;

        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.033);
        lastTime = now;

        gl.viewport(0, 0, simRes, simRes);

        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        while (splatsQueue.length > 0) {
          const s = splatsQueue.pop();

          gl.useProgram(splatProgram);
          gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), velocity.read().attach(0));
          gl.uniform1f(gl.getUniformLocation(splatProgram, 'uAspectRatio'), width / height);
          gl.uniform2f(gl.getUniformLocation(splatProgram, 'uPoint'), s.x, s.y);
          gl.uniform3f(gl.getUniformLocation(splatProgram, 'uColor'), s.dx, s.dy, 0.0);
          gl.uniform1f(gl.getUniformLocation(splatProgram, 'uRadius'), 0.0022);
          gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write().fbo);
          gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
          velocity.swap();

          gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), density.read().attach(0));
          gl.uniform3f(gl.getUniformLocation(splatProgram, 'uColor'), s.color[0], s.color[1], s.color[2]);
          gl.uniform1f(gl.getUniformLocation(splatProgram, 'uRadius'), 0.0026);
          gl.bindFramebuffer(gl.FRAMEBUFFER, density.write().fbo);
          gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
          density.swap();
        }

        gl.useProgram(advectionProgram);
        gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), velocity.read().attach(0));
        gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), velocity.read().attach(0));
        gl.uniform2f(gl.getUniformLocation(advectionProgram, 'uTexelSize'), 1.0 / simRes, 1.0 / simRes);
        gl.uniform1f(gl.getUniformLocation(advectionProgram, 'uDt'), dt);
        gl.uniform1f(gl.getUniformLocation(advectionProgram, 'uDissipation'), 0.985);
        gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write().fbo);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        velocity.swap();

        gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), velocity.read().attach(0));
        gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), density.read().attach(1));
        gl.uniform1f(gl.getUniformLocation(advectionProgram, 'uDissipation'), 0.965);
        gl.bindFramebuffer(gl.FRAMEBUFFER, density.write().fbo);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        density.swap();

        gl.viewport(0, 0, width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(displayProgram);
        gl.uniform1i(gl.getUniformLocation(displayProgram, 'uTexture'), density.read().attach(0));
        gl.uniform1f(gl.getUniformLocation(displayProgram, 'uIsDark'), isDark ? 1.0 : 0.0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        requestAnimationFrame(render);
      };

      render();

      return () => {
        isDestroyed = true;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    } else {
      // 2D Canvas Fallback
      const ctx = canvas.getContext('2d');
      const particles = [];

      const handleMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          for (let i = 0; i < 3; i++) {
            particles.push({
              x: x + (Math.random() - 0.5) * 12,
              y: y + (Math.random() - 0.5) * 12,
              radius: Math.random() * 24 + 14,
              alpha: 0.6,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
            });
          }
        }
      };

      window.addEventListener('mousemove', handleMove);

      const anim = () => {
        if (isDestroyed) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha *= 0.95;
          p.radius *= 0.98;

          if (p.alpha < 0.01) {
            particles.splice(i, 1);
            continue;
          }

          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          g.addColorStop(0, `rgba(252, 71, 120, ${p.alpha})`);
          g.addColorStop(1, 'rgba(252, 71, 120, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        requestAnimationFrame(anim);
      };
      anim();

      return () => {
        isDestroyed = true;
        window.removeEventListener('mousemove', handleMove);
      };
    }
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        mixBlendMode: isDark ? 'screen' : 'multiply',
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
