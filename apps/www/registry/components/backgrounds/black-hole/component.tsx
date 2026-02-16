"use client";

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh, RenderTarget, Transform } from 'ogl';
import { BlackHoleProps, QUALITY_SETTINGS } from './types';
import {
  discVertexShader,
  discFragmentShader,
  particleVertexShader,
  particleFragmentShader,
  distortionVertexShader,
  distortionFragmentShader,
  finalVertexShader,
  finalFragmentShader,
} from './shaders';

/**
 * Black Hole Background Component
 *
 * A WebGL black hole effect featuring:
 * - Animated accretion disc with Perlin noise
 * - Thousands of orbiting particles
 * - Gravitational lensing distortion
 * - Chromatic aberration (RGB color split)
 *
 * Based on Bruno Simon's webgl-black-hole
 */
export default function BlackHole({
  innerColor = '#ff8080',
  outerColor = '#3633ff',
  particleCount,
  particleSize = 0.015,
  rotationSpeed = 0.3,
  orbitSpeed = 1.0,
  disableAnimation = false,
  rgbShiftRadius = 0.00001,
  distortionStrength = 1.0,
  quality = 'medium',
  className = '',
}: BlackHoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // =========================================================================
    // SETUP
    // =========================================================================

    const qualityConfig = QUALITY_SETTINGS[quality];
    const effectiveParticleCount = particleCount ?? qualityConfig.particleCount;

    // Initialize OGL renderer with alpha transparency
    const renderer = new Renderer({
      dpr: qualityConfig.pixelRatio,
      alpha: true,
      depth: true,
      antialias: quality !== 'low',
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    // Setup camera
    const camera = new Camera(gl, {
      fov: 45,
      near: 0.1,
      far: 100,
    });
    camera.position.set(0, 0, 5);

    // =========================================================================
    // RENDER TARGETS
    // =========================================================================

    // High-resolution target for space scene (disc + particles)
    const spaceTarget = new RenderTarget(gl, {
      width: qualityConfig.spaceTargetSize,
      height: qualityConfig.spaceTargetSize,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    // Low-resolution target for distortion mask (performance optimization)
    const distortionTarget = new RenderTarget(gl, {
      width: qualityConfig.distortionTargetSize,
      height: qualityConfig.distortionTargetSize,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1, 1, 1];
    };

    const innerRgb = hexToRgb(innerColor);
    const outerRgb = hexToRgb(outerColor);

    // =========================================================================
    // SCENE 1: SPACE SCENE (Accretion Disc + Particles)
    // =========================================================================

    const spaceScene = new Transform();

    // --- Accretion Disc ---
    const discGeometry = new Geometry(gl, {
      position: {
        size: 3,
        data: new Float32Array([
          -2, -2, 0,
          2, -2, 0,
          2, 2, 0,
          -2, -2, 0,
          2, 2, 0,
          -2, 2, 0,
        ]),
      },
      uv: {
        size: 2,
        data: new Float32Array([
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,
        ]),
      },
    });

    const discProgram = new Program(gl, {
      vertex: discVertexShader,
      fragment: discFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uInnerColor: { value: innerRgb },
        uOuterColor: { value: outerRgb },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const discMesh = new Mesh(gl, {
      geometry: discGeometry,
      program: discProgram,
    });
    discMesh.setParent(spaceScene);

    // --- Particle System ---
    const particlePositions = new Float32Array(effectiveParticleCount * 3);
    const particleRandoms = new Float32Array(effectiveParticleCount);

    for (let i = 0; i < effectiveParticleCount; i++) {
      // position.x is used as the particle's progress parameter [0, 1]
      particlePositions[i * 3 + 0] = i / effectiveParticleCount;
      particlePositions[i * 3 + 1] = 0;
      particlePositions[i * 3 + 2] = 0;
      particleRandoms[i] = Math.random();
    }

    const particleGeometry = new Geometry(gl, {
      position: { size: 3, data: particlePositions },
      aRandom: { size: 1, data: particleRandoms },
    });

    const particleProgram = new Program(gl, {
      vertex: particleVertexShader,
      fragment: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: particleSize },
        uInnerColor: { value: innerRgb },
        uOuterColor: { value: outerRgb },
        uViewHeight: { value: gl.canvas.height },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const particleMesh = new Mesh(gl, {
      mode: gl.POINTS,
      geometry: particleGeometry,
      program: particleProgram,
    });
    particleMesh.setParent(spaceScene);

    // =========================================================================
    // SCENE 2: DISTORTION MASK
    // =========================================================================

    const distortionScene = new Transform();

    // Fullscreen quad for distortion mask
    const distortionGeometry = new Geometry(gl, {
      position: {
        size: 3,
        data: new Float32Array([
          -1, -1, 0,
          1, -1, 0,
          1, 1, 0,
          -1, -1, 0,
          1, 1, 0,
          -1, 1, 0,
        ]),
      },
      uv: {
        size: 2,
        data: new Float32Array([
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,
        ]),
      },
    });

    const distortionProgram = new Program(gl, {
      vertex: distortionVertexShader,
      fragment: distortionFragmentShader,
      uniforms: {
        uBlackHolePosition: { value: [0.5, 0.5] },
      },
      depthTest: false,
      depthWrite: false,
    });

    const distortionMesh = new Mesh(gl, {
      geometry: distortionGeometry,
      program: distortionProgram,
    });
    distortionMesh.setParent(distortionScene);

    // =========================================================================
    // SCENE 3: FINAL COMPOSITION
    // =========================================================================

    const finalScene = new Transform();

    // Fullscreen quad for final composition
    const finalGeometry = new Geometry(gl, {
      position: {
        size: 3,
        data: new Float32Array([
          -1, -1, 0,
          1, -1, 0,
          1, 1, 0,
          -1, -1, 0,
          1, 1, 0,
          -1, 1, 0,
        ]),
      },
      uv: {
        size: 2,
        data: new Float32Array([
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,
        ]),
      },
    });

    const finalProgram = new Program(gl, {
      vertex: finalVertexShader,
      fragment: finalFragmentShader,
      uniforms: {
        uSpaceTexture: { value: spaceTarget.texture },
        uDistortionTexture: { value: distortionTarget.texture },
        uBlackHolePosition: { value: [0.5, 0.5] },
        uRGBShiftRadius: { value: rgbShiftRadius },
        uDistortionStrength: { value: distortionStrength },
      },
      depthTest: false,
      depthWrite: false,
    });

    const finalMesh = new Mesh(gl, {
      geometry: finalGeometry,
      program: finalProgram,
    });
    finalMesh.setParent(finalScene);

    // =========================================================================
    // WINDOW RESIZE
    // =========================================================================

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({
        aspect: width / height,
      });
      particleProgram.uniforms.uViewHeight.value = height;
    };

    window.addEventListener('resize', resize, false);
    resize();

    // =========================================================================
    // ANIMATION LOOP (Three-Pass Rendering)
    // =========================================================================

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = time - lastTime;
      lastTime = time;

      if (!disableAnimation) {
        elapsed += delta * 0.001;

        // Update time uniforms
        discProgram.uniforms.uTime.value = elapsed * rotationSpeed;
        particleProgram.uniforms.uTime.value = elapsed * orbitSpeed;
      }

      // --- PASS 1: Render space scene (disc + particles) to texture ---
      renderer.render({
        scene: spaceScene,
        camera: camera,
        target: spaceTarget,
      });

      // --- PASS 2: Render distortion mask to texture ---
      renderer.render({
        scene: distortionScene,
        camera: camera,
        target: distortionTarget,
      });

      // --- PASS 3: Final composition to screen ---
      renderer.render({
        scene: finalScene,
        camera: camera,
      });
    };

    animationFrameId = requestAnimationFrame(render);

    // =========================================================================
    // CLEANUP
    // =========================================================================

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);

      // Dispose geometries
      discGeometry.remove();
      particleGeometry.remove();
      distortionGeometry.remove();
      finalGeometry.remove();

      // Remove canvas
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }

      // Lose WebGL context
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    innerColor,
    outerColor,
    particleCount,
    particleSize,
    rotationSpeed,
    orbitSpeed,
    disableAnimation,
    rgbShiftRadius,
    distortionStrength,
    quality,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ backgroundColor: 'transparent' }}
    />
  );
}
