"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface BlackHoleProps {
  innerColor?: string;
  outerColor?: string;
  quality?: 'low' | 'medium' | 'high';
  particleCount?: number;
  particleSize?: number;
  rotationSpeed?: number;
  orbitSpeed?: number;
  disableAnimation?: boolean;
  enableCameraAnimation?: boolean;
  enableOrbitControls?: boolean;
  rgbShiftRadius?: number;
  distortionStrength?: number;
  className?: string;
}

// ============================================================================
// SHADERS
// ============================================================================

const PERLIN_3D_PERIODIC = `
// Classic Perlin 3D Noise by Stefan Gustavson
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float perlin3dPeriodic(vec3 P, vec3 rep) {
  vec3 Pi0 = mod(floor(P), rep);
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

// Disc Shaders
const discVertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

const discFragmentShader = `
precision highp float;
${PERLIN_3D_PERIODIC}

uniform float uTime;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;
varying vec2 vUv;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 blendAdd(vec3 base, vec3 blend) {
  return min(base + blend, vec3(1.0));
}

void main() {
  vec4 color = vec4(0.0);
  color.a = 1.0;

  float iterations = 3.0;

  for(float i = 0.0; i < iterations; i++) {
    float progress = i / (iterations - 1.0);
    float intensity = 1.0 - ((vUv.y - progress) * iterations) * 0.5;
    intensity = smoothstep(0.0, 1.0, intensity);

    vec2 uv = vUv;
    uv.y *= 2.0;
    uv.x += uTime / ((i * 10.0) + 1.0);

    vec3 ringColor = mix(uInnerColor, uOuterColor, progress);
    float uFrequency = 8.0;
    float noiseIntensity = perlin3dPeriodic(vec3(uv * uFrequency, 123.456), vec3(uFrequency)) * 0.5 + 0.5;
    ringColor = mix(vec3(0.0), ringColor, noiseIntensity * intensity);
    color.rgb = blendAdd(color.rgb, ringColor);
  }

  float edgesAttenuation = min(inverseLerp(vUv.y, 0.0, 0.02), inverseLerp(vUv.y, 1.0, 0.5));
  color.rgb = mix(vec3(0.0), color.rgb, edgesAttenuation);

  gl_FragColor = color;
}
`;

// Particle Shaders
const particleVertexShader = `
#define PI 3.1415926538

uniform float uTime;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;
uniform float uViewHeight;
uniform float uSize;

attribute float aSize;
attribute float aRandom;

varying vec3 vColor;

void main() {
  float concentration = 0.05;
  float outerProgress = smoothstep(0.0, 1.0, position.x);
  outerProgress = mix(concentration, outerProgress, pow(aRandom, 1.7));
  float radius = 1.0 + outerProgress * 5.0;

  float angle = outerProgress - uTime * (1.0 - outerProgress) * 3.0;
  vec3 newPosition = vec3(
    sin(angle) * radius,
    0.0,
    cos(angle) * radius
  );

  vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;

  gl_PointSize = aSize * uSize * uViewHeight;
  gl_PointSize *= (1.0 / - modelViewPosition.z);

  vColor = mix(uInnerColor, uOuterColor, outerProgress);
}
`;

const particleFragmentShader = `
precision highp float;
varying vec3 vColor;

void main() {
  float distanceToCenter = length(gl_PointCoord - vec2(0.5));
  if(distanceToCenter > 0.5) discard;

  gl_FragColor = vec4(vColor, 0.5);
}
`;

// Distortion Mask Shader
const distortionMaskVertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

const distortionMaskFragmentShader = `
precision highp float;
varying vec2 vUv;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  float distanceToCenter = length(vUv - 0.5);
  float radialStrength = remap(distanceToCenter, 0.0, 0.15, 1.0, 0.0);
  radialStrength = smoothstep(0.0, 1.0, radialStrength);

  float alpha = smoothstep(0.0, 1.0, remap(distanceToCenter, 0.4, 0.5, 1.0, 0.0));

  gl_FragColor = vec4(radialStrength, 0.0, 0.0, alpha);
}
`;

// Final Composition Shader
const finalVertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

const finalFragmentShader = `
#define PI 3.1415926538

precision highp float;
varying vec2 vUv;

uniform sampler2D uSpaceTexture;
uniform sampler2D uDistortionTexture;
uniform vec2 uBlackHolePosition;
uniform float uRGBShiftRadius;

vec3 getRGBShiftedColor(sampler2D _texture, vec2 _uv, float _radius) {
  vec3 angle = vec3(PI * 2.0 / 3.0, PI * 4.0 / 3.0, 0.0);
  vec3 color = vec3(0.0);
  color.r = texture2D(_texture, _uv + vec2(sin(angle.r) * _radius, cos(angle.r) * _radius)).r;
  color.g = texture2D(_texture, _uv + vec2(sin(angle.g) * _radius, cos(angle.g) * _radius)).g;
  color.b = texture2D(_texture, _uv + vec2(sin(angle.b) * _radius, cos(angle.b) * _radius)).b;
  return color;
}

void main() {
  vec4 distortionColor = texture2D(uDistortionTexture, vUv);
  float distortionIntensity = distortionColor.r;
  vec2 towardCenter = vUv - uBlackHolePosition;
  towardCenter *= - distortionIntensity * 2.0;

  vec2 distoredUv = vUv + towardCenter;
  vec3 outColor = getRGBShiftedColor(uSpaceTexture, distoredUv, uRGBShiftRadius);

  gl_FragColor = vec4(outColor, 1.0);
}
`;

// ============================================================================
// COMPONENT
// ============================================================================

export default function BlackHole({
  innerColor = '#ff8080',
  outerColor = '#3633ff',
  quality = 'medium',
  particleCount,
  particleSize = 0.015,
  rotationSpeed = 0.3,
  orbitSpeed = 1.0,
  disableAnimation = false,
  enableCameraAnimation = true,
  enableOrbitControls = true,
  rgbShiftRadius = 0.00001,
  distortionStrength = 1.0,
  className = '',
}: BlackHoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Quality settings
    const qualitySettings = {
      low: { particles: 10000, spaceRes: 1, distortionRes: 0.25, pixelRatio: 1 },
      medium: { particles: 25000, spaceRes: 2, distortionRes: 0.5, pixelRatio: Math.min(window.devicePixelRatio, 2) },
      high: { particles: 50000, spaceRes: 2, distortionRes: 0.5, pixelRatio: Math.min(window.devicePixelRatio, 2) },
    };
    const config = qualitySettings[quality];
    const effectiveParticleCount = particleCount ?? config.particles;

    // ==================================================
    // SETUP
    // ==================================================
    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight,
    };

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(config.pixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Check for WebGL errors
    const gl = renderer.getContext();
    console.log('[BlackHole] WebGL initialized:', gl !== null);
    console.log('[BlackHole] Particle count:', effectiveParticleCount);

    // Camera for space and distortion scenes
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 4, 8); // Position camera above and back to view the disc
    camera.lookAt(0, 0, 0); // Look at center of black hole

    // Orthographic camera for final composition
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Orbit Controls for interactive camera
    let controls: OrbitControls | null = null;
    if (enableOrbitControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 15;
      controls.enablePan = false;
    }

    // Scenes
    const spaceScene = new THREE.Scene();
    const distortionScene = new THREE.Scene();

    // Render Targets
    const spaceTarget = new THREE.WebGLRenderTarget(
      sizes.width * config.spaceRes,
      sizes.height * config.spaceRes,
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }
    );

    const distortionTarget = new THREE.WebGLRenderTarget(
      sizes.width * config.distortionRes,
      sizes.height * config.distortionRes,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
      }
    );

    // Helper function to convert hex to vec3
    const hexToVec3 = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // ==================================================
    // SPACE SCENE: Disc + Particles
    // ==================================================

    // Accretion Disc (Cylinder Geometry)
    const discGeometry = new THREE.CylinderGeometry(5, 1, 0, 64, 10, true);
    const discMaterial = new THREE.ShaderMaterial({
      vertexShader: discVertexShader,
      fragmentShader: discFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uInnerColor: { value: hexToVec3(innerColor) },
        uOuterColor: { value: hexToVec3(outerColor) },
      },
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });
    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    spaceScene.add(discMesh);

    // Particle System
    const positionArray = new Float32Array(effectiveParticleCount * 3);
    const sizeArray = new Float32Array(effectiveParticleCount);
    const randomArray = new Float32Array(effectiveParticleCount);

    for (let i = 0; i < effectiveParticleCount; i++) {
      // Store distance in position.x, y and z are unused
      positionArray[i * 3 + 0] = Math.random(); // distance
      positionArray[i * 3 + 1] = 0;
      positionArray[i * 3 + 2] = 0;
      sizeArray[i] = Math.random();
      randomArray[i] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1));
    particlesGeometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randomArray, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uInnerColor: { value: hexToVec3(innerColor) },
        uOuterColor: { value: hexToVec3(outerColor) },
        uViewHeight: { value: sizes.height },
        uSize: { value: particleSize },
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });

    const particlesPoints = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesPoints.frustumCulled = false;
    spaceScene.add(particlesPoints);

    // ==================================================
    // DISTORTION SCENE: Mask
    // ==================================================

    const distortionMaskGeometry = new THREE.PlaneGeometry(1, 1);
    const distortionMaskMaterial = new THREE.ShaderMaterial({
      vertexShader: distortionMaskVertexShader,
      fragmentShader: distortionMaskFragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    const distortionMaskMesh = new THREE.Mesh(distortionMaskGeometry, distortionMaskMaterial);
    distortionMaskMesh.scale.set(10, 10, 10);
    distortionMaskMesh.rotation.x = Math.PI * 0.5;
    distortionScene.add(distortionMaskMesh);

    // ==================================================
    // FINAL COMPOSITION
    // ==================================================

    const finalScene = new THREE.Scene();
    const finalGeometry = new THREE.PlaneGeometry(2, 2);
    const finalMaterial = new THREE.ShaderMaterial({
      vertexShader: finalVertexShader,
      fragmentShader: finalFragmentShader,
      uniforms: {
        uSpaceTexture: { value: spaceTarget.texture },
        uDistortionTexture: { value: distortionTarget.texture },
        uBlackHolePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uRGBShiftRadius: { value: rgbShiftRadius },
      },
      depthWrite: false,
      depthTest: false,
    });
    const finalMesh = new THREE.Mesh(finalGeometry, finalMaterial);
    finalMesh.frustumCulled = false;
    finalScene.add(finalMesh);

    // ==================================================
    // RESIZE HANDLER
    // ==================================================

    const handleResize = () => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;

      renderer.setSize(sizes.width, sizes.height);
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      particlesMaterial.uniforms.uViewHeight.value = sizes.height;

      spaceTarget.setSize(sizes.width * config.spaceRes, sizes.height * config.spaceRes);
      distortionTarget.setSize(sizes.width * config.distortionRes, sizes.height * config.distortionRes);
    };

    window.addEventListener('resize', handleResize);

    // ==================================================
    // ANIMATION LOOP
    // ==================================================

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!disableAnimation) {
        const elapsed = clock.getElapsedTime();

        // Update uniforms
        discMaterial.uniforms.uTime.value = elapsed * rotationSpeed;
        particlesMaterial.uniforms.uTime.value = elapsed * orbitSpeed + 9999.0;

        // Camera animation (slow orbit around the black hole)
        if (enableCameraAnimation && !controls) {
          const radius = 8;
          const speed = 0.1;
          camera.position.x = Math.sin(elapsed * speed) * radius;
          camera.position.z = Math.cos(elapsed * speed) * radius;
          camera.position.y = 4 + Math.sin(elapsed * speed * 0.5) * 1;
          camera.lookAt(0, 0, 0);
        }

        // Update black hole position in screen space
        const screenPosition = new THREE.Vector3(0, 0, 0);
        screenPosition.project(camera);
        const x = screenPosition.x * 0.5 + 0.5;
        const y = screenPosition.y * 0.5 + 0.5;
        finalMaterial.uniforms.uBlackHolePosition.value.set(x, y);
      }

      // Update orbit controls
      if (controls) {
        controls.update();
      }

      // Multi-pass rendering
      renderer.setRenderTarget(spaceTarget);
      renderer.render(spaceScene, camera);

      renderer.setRenderTarget(distortionTarget);
      renderer.render(distortionScene, camera);

      renderer.setRenderTarget(null);
      renderer.render(finalScene, orthoCamera);
    };

    animate();

    // ==================================================
    // CLEANUP
    // ==================================================

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);

      discGeometry.dispose();
      discMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      distortionMaskGeometry.dispose();
      distortionMaskMaterial.dispose();
      finalGeometry.dispose();
      finalMaterial.dispose();
      spaceTarget.dispose();
      distortionTarget.dispose();

      if (controls) {
        controls.dispose();
      }

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [
    innerColor,
    outerColor,
    quality,
    particleCount,
    particleSize,
    rotationSpeed,
    orbitSpeed,
    disableAnimation,
    enableCameraAnimation,
    enableOrbitControls,
    rgbShiftRadius,
    distortionStrength,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ backgroundColor: 'transparent' }}
    />
  );
}
