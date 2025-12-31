/**
 * Hook for triggering haptic feedback on mobile devices
 * Uses the Navigator Vibration API when available
 */
export const useHapticFeedback = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const light = () => {
    if (isSupported) {
      navigator.vibrate(10);
    }
  };

  const medium = () => {
    if (isSupported) {
      navigator.vibrate(20);
    }
  };

  const heavy = () => {
    if (isSupported) {
      navigator.vibrate(30);
    }
  };

  const success = () => {
    if (isSupported) {
      navigator.vibrate([10, 50, 20]);
    }
  };

  const error = () => {
    if (isSupported) {
      navigator.vibrate([30, 50, 30, 50, 30]);
    }
  };

  return { light, medium, heavy, success, error, isSupported };
};
