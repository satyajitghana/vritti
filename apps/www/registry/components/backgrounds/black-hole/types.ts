export interface BlackHoleProps {
  // Color configuration
  /** Inner color of the accretion disc (closest to black hole) */
  innerColor?: string;

  /** Outer color of the accretion disc (edge) */
  outerColor?: string;

  // Particle system
  /** Number of orbiting particles. Quality presets override this: low=10000, medium=25000, high=50000 */
  particleCount?: number;

  /** Size multiplier for particles */
  particleSize?: number;

  // Animation
  /** Speed multiplier for disc rotation */
  rotationSpeed?: number;

  /** Speed multiplier for particle orbital motion */
  orbitSpeed?: number;

  /** Disable all animation (static render) */
  disableAnimation?: boolean;

  // Visual effects
  /** Intensity of chromatic aberration (RGB color split). Very small values recommended. */
  rgbShiftRadius?: number;

  /** Strength of gravitational lensing distortion effect */
  distortionStrength?: number;

  // Quality presets
  /**
   * Quality preset affects particle count, render target resolution, and pixel ratio.
   * - low: 10k particles, 512px space target, 128px distortion target
   * - medium: 25k particles, 1024px space target, 256px distortion target
   * - high: 50k particles, 2048px space target, 512px distortion target
   */
  quality?: 'low' | 'medium' | 'high';

  // Container
  /** Additional CSS classes for the container div */
  className?: string;
}

export interface QualitySettings {
  particleCount: number;
  spaceTargetSize: number;
  distortionTargetSize: number;
  pixelRatio: number;
}

export const QUALITY_SETTINGS: Record<'low' | 'medium' | 'high', QualitySettings> = {
  low: {
    particleCount: 10000,
    spaceTargetSize: 512,
    distortionTargetSize: 128,
    pixelRatio: 1,
  },
  medium: {
    particleCount: 25000,
    spaceTargetSize: 1024,
    distortionTargetSize: 256,
    pixelRatio: 1.5,
  },
  high: {
    particleCount: 50000,
    spaceTargetSize: 2048,
    distortionTargetSize: 512,
    pixelRatio: 2,
  }
};
