import { ref } from 'vue';

interface ScreenSizeInfo {
  cssClasses: string[],
  isSmallMobileMedia: boolean,
  isXSmall: boolean,
  isSmall: boolean,
  isMedium: boolean
  isLarge: boolean
}
type Handler = (arg?: unknown) => void;
const Breakpoints = {
  smallMobileMedia: '(max-width: 420px)',
  XSmall: '(max-width: 575.98px)',
  Small: '(min-width: 576px) and (max-width: 991.98px)',
  Medium: '(min-width: 992px) and (max-width: 1199.98px)',
  Large: '(min-width: 1200px)',
};

const smallMobileMedia = window.matchMedia(Breakpoints.smallMobileMedia);
const xSmallMedia = window.matchMedia(Breakpoints.XSmall);
const smallMedia = window.matchMedia(Breakpoints.Small);
const mediumMedia = window.matchMedia(Breakpoints.Medium);
const largeMedia = window.matchMedia(Breakpoints.Large);

const handlers = new Set<Handler>();

[smallMobileMedia, xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addEventListener('change', (e) => {
    if (e.matches || (media === smallMobileMedia)) {
      handlers.forEach((handler) => handler());
    }
  });
});

export const sizes = () => ({
  'screen-small-mobile': smallMobileMedia.matches,
  'screen-x-small': xSmallMedia.matches,
  'screen-small': smallMedia.matches,
  'screen-medium': mediumMedia.matches,
  'screen-large': largeMedia.matches,
});

function getScreenSizeInfo(): ScreenSizeInfo {
  const screenSizes: {[key: string]: boolean} = sizes();
  return {
    isSmallMobileMedia: screenSizes['screen-small-mobile'],
    isXSmall: screenSizes['screen-x-small'],
    isSmall: screenSizes['screen-small'],
    isMedium: screenSizes['screen-medium'],
    isLarge: screenSizes['screen-large'],
    cssClasses: Object.keys(screenSizes).filter((cl: string) => screenSizes[cl]),
  };
}

export const screenInfo = ref(getScreenSizeInfo());

export const subscribe = (handler:Handler) => handlers.add(handler);

export const unsubscribe = (handler:Handler) => handlers.delete(handler);

subscribe(() => {
  screenInfo.value = getScreenSizeInfo();
});
