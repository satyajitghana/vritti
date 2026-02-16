/**
 * Black Hole Shaders
 * Converted from Bruno Simon's webgl-black-hole
 * All shaders use GLSL ES 1.0 syntax for WebGL compatibility
 */

// =============================================================================
// SHARED UTILITIES
// =============================================================================

/**
 * Perlin 3D Periodic Noise
 * Classic Perlin noise implementation by Stefan Gustavson
 * Returns noise value in range [-1, 1]
 */
export const perlinNoise3D = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
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

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

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

// =============================================================================
// ACCRETION DISC SHADERS
// =============================================================================

export const discVertexShader = `
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const discFragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;

varying vec2 vUv;

${perlinNoise3D}

void main() {
  // Center UV coordinates
  vec2 uv = vUv - 0.5;
  float dist = length(uv);

  // Discard outside disc radius
  if (dist > 0.5) discard;

  // Calculate angle for rotation
  float angle = atan(uv.y, uv.x);

  // Layered disc effect with 3 iterations for depth
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  for (float i = 0.0; i < 3.0; i++) {
    // Animated rotation per layer
    float layerTime = uTime + i * 0.3;
    float rotatedAngle = angle + layerTime * 0.5;

    // Create noise coordinates
    vec3 noiseCoord = vec3(
      cos(rotatedAngle) * dist * 8.0,
      sin(rotatedAngle) * dist * 8.0,
      layerTime * 0.2 + i
    );

    // Sample Perlin noise
    float noise = perlin3dPeriodic(noiseCoord, vec3(8.0, 8.0, 8.0));
    noise = noise * 0.5 + 0.5; // Remap to [0, 1]

    // Mix colors based on distance from center
    float colorMix = smoothstep(0.0, 0.5, dist);
    vec3 layerColor = mix(uInnerColor, uOuterColor, colorMix);

    // Add noise variation
    layerColor *= noise * 1.5;

    // Edge attenuation
    float edgeFade = 1.0 - smoothstep(0.35, 0.5, dist);
    float centerFade = smoothstep(0.0, 0.15, dist);
    float fade = edgeFade * centerFade;

    // Accumulate color
    color += layerColor * fade * (1.0 / 3.0);
    alpha += fade * noise * (1.0 / 3.0);
  }

  // Output with alpha for additive blending
  gl_FragColor = vec4(color, alpha * 0.8);
}
`;

// =============================================================================
// PARTICLE SHADERS
// =============================================================================

export const particleVertexShader = `
attribute vec3 position;
attribute float aRandom;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSize;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;
uniform float uViewHeight;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Position.x is used as the particle's progress parameter [0, 1]
  float t = position.x;

  // Orbital mechanics
  float concentration = 0.05;
  float outerProgress = smoothstep(0.0, 1.0, t);
  outerProgress = mix(concentration, outerProgress, pow(aRandom, 1.7));

  // Calculate orbital radius (1.0 to 6.0)
  float radius = 1.0 + outerProgress * 5.0;

  // Calculate orbital angle (particles spiral inward over time)
  float angle = outerProgress * 6.28318 - uTime * (1.0 - outerProgress) * 3.0;

  // Convert to 3D position (disc-like distribution)
  vec3 particlePosition = vec3(
    sin(angle) * radius,
    (aRandom - 0.5) * 0.3 * (1.0 - outerProgress), // Slight vertical spread
    cos(angle) * radius
  );

  // Calculate final position
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(particlePosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size based on depth and orbital progress
  float sizeAttenuation = (1.0 / -mvPosition.z) * uViewHeight;
  gl_PointSize = uSize * 100.0 * sizeAttenuation * (1.0 - outerProgress * 0.5);

  // Color interpolation based on orbital distance
  vColor = mix(uInnerColor, uOuterColor, outerProgress);

  // Alpha based on distance (fade toward center)
  vAlpha = smoothstep(0.0, 0.3, outerProgress) * (1.0 - smoothstep(0.7, 1.0, outerProgress));
}
`;

export const particleFragmentShader = `
precision highp float;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Calculate distance from center of point
  vec2 uv = gl_PointCoord.xy - 0.5;
  float dist = length(uv);

  // Discard pixels outside circle
  if (dist > 0.5) discard;

  // Smooth circle edge
  float alpha = smoothstep(0.5, 0.3, dist);

  // Apply color and alpha
  gl_FragColor = vec4(vColor, alpha * vAlpha * 0.6);
}
`;

// =============================================================================
// DISTORTION MASK SHADERS
// =============================================================================

export const distortionVertexShader = `
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const distortionFragmentShader = `
precision highp float;

uniform vec2 uBlackHolePosition;

varying vec2 vUv;

void main() {
  // Calculate distance from black hole center
  vec2 toCenter = vUv - uBlackHolePosition;
  float dist = length(toCenter);

  // Create radial distortion gradient
  // Stronger near center, fades out with distance
  float distortionStrength = smoothstep(0.5, 0.0, dist);

  // Output to red channel (single channel for efficiency)
  gl_FragColor = vec4(distortionStrength, 0.0, 0.0, 1.0);
}
`;

// =============================================================================
// FINAL COMPOSITION SHADERS
// =============================================================================

export const finalVertexShader = `
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const finalFragmentShader = `
precision highp float;

uniform sampler2D uSpaceTexture;
uniform sampler2D uDistortionTexture;
uniform vec2 uBlackHolePosition;
uniform float uRGBShiftRadius;
uniform float uDistortionStrength;

varying vec2 vUv;

void main() {
  // Sample distortion mask
  vec4 distortionColor = texture2D(uDistortionTexture, vUv);
  float distortionIntensity = distortionColor.r * uDistortionStrength;

  // Calculate distortion direction (toward black hole center)
  vec2 towardCenter = vUv - uBlackHolePosition;
  towardCenter *= -distortionIntensity * 2.0; // Negative = pull inward

  // Apply distortion to UV coordinates
  vec2 distortedUv = vUv + towardCenter;

  // Chromatic aberration (RGB channel split at 120° intervals)
  const float PI = 3.14159265359;
  vec3 angles = vec3(
    PI * 2.0 / 3.0,  // 120 degrees
    PI * 4.0 / 3.0,  // 240 degrees
    0.0              // 0 degrees
  );

  // Sample each color channel at different offsets
  vec3 color;
  color.r = texture2D(uSpaceTexture, distortedUv + vec2(sin(angles.r), cos(angles.r)) * uRGBShiftRadius).r;
  color.g = texture2D(uSpaceTexture, distortedUv + vec2(sin(angles.g), cos(angles.g)) * uRGBShiftRadius).g;
  color.b = texture2D(uSpaceTexture, distortedUv + vec2(sin(angles.b), cos(angles.b)) * uRGBShiftRadius).b;

  gl_FragColor = vec4(color, 1.0);
}
`;
