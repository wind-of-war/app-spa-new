import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const scale = clamp(width / 390, 0.84, 1.2);
    const s = (value: number) => Math.round(value * scale);

    return {
      width,
      height,
      scale,
      isPhone: width <= 430,
      isTablet: width >= 768,
      s,
      fs: (value: number) => Math.round(value * clamp(scale, 0.9, 1.12)),
    } as const;
  }, [height, width]);
}

