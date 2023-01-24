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

const smallMobileMedia = window.matchMedia('(max-width: 420px)');
const xSmallMedia = window.matchMedia('(max-width: 575.98px)');
const smallMedia = window.matchMedia('(min-width: 576px) and (max-width: 991.98px)');
const mediumMedia = window.matchMedia('(min-width: 992px) and (max-width: 1199.98px)');
const largeMedia = window.matchMedia('(min-width: 1200px)');

[smallMobileMedia, xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addEventListener('change', (e) => {
    if (e.matches || (media === smallMobileMedia)) {
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
    isSmallMobileMedia: smallMobileMedia.matches,
    isXSmall: xSmallMedia.matches,
    isSmall: smallMedia.matches,
    isMedium: mediumMedia.matches,
    isLarge: largeMedia.matches,
  };
}
