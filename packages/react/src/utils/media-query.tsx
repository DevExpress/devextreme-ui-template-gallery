import { useState, useCallback, useEffect } from 'react';
import type { Handle } from '../types';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const onSizeChanged = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    subscribe(onSizeChanged);

    return () => {
      unsubscribe(onSizeChanged);
    };
  }, [onSizeChanged]);

  return screenSize;
};

export const useScreenSizeClass = () => {
  const screenSize = useScreenSize();

  if (screenSize.isLarge) {
    return 'screen-large';
  }

  if (screenSize.isMedium) {
    return 'screen-medium';
  }

  if (screenSize.isSmall) {
    return 'screen-small';
  }

  return 'screen-x-small';
};

let handlers: Handle[] = [];

const xSmallMedia = window.matchMedia('(max-width: 575.98px)');
const smallMedia = window.matchMedia('(min-width: 576px) and (max-width: 991.98px)');
const mediumMedia = window.matchMedia('(min-width: 992px) and (max-width: 1199.98px)');
const largeMedia = window.matchMedia('(min-width: 1200px)');

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addEventListener('change', (e) => {
    if (e.matches) {
      handlers.forEach((handler) => handler());
    }
  });
});

const subscribe = (handler: Handle) => handlers.push(handler);

const unsubscribe = (handler: Handle) => {
  handlers = handlers.filter((item) => item !== handler);
};

function getScreenSize() {
  return {
    isXSmall: xSmallMedia.matches,
    isSmall: smallMedia.matches,
    isMedium: mediumMedia.matches,
    isLarge: largeMedia.matches,
  };
}

export function getSizeQualifier(width: number) {
  if (width <= 420) return 'xs';
  if (width <= 992) return 'sm';
  if (width < 1200) return 'md';
  return 'lg';
}
