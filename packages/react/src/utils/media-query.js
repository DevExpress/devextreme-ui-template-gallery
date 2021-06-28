import { useState, useCallback, useEffect } from 'react';

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
}

let handlers = [];
const xSmallMedia = window.matchMedia('(max-width: 599.99px)');
const smallMedia = window.matchMedia('(min-width: 600px) and (max-width: 959.99px)');
const mediumMedia = window.matchMedia('(min-width: 960px) and (max-width: 1279.99px)');
const largeMedia = window.matchMedia('(min-width: 1280px)');

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach(media => {
  media.addListener((e) => {
    e.matches && handlers.forEach(handler => handler());
  });
});

const subscribe = handler => handlers.push(handler);

const unsubscribe = handler => {
  handlers = handlers.filter(item => item !== handler);
};

function getScreenSize() {
  return {
    isXSmall: xSmallMedia.matches,
    isSmall: smallMedia.matches,
    isMedium: mediumMedia.matches,
    isLarge: largeMedia.matches
  };
}
