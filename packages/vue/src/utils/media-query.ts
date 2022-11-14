import { ref } from 'vue';

interface ScreenSizeInfo {
  cssClasses: string[],
  isXSmall: boolean,
  isSmall: boolean,
  isMedium: boolean
  isLarge: boolean
}
type Handler = (arg?: unknown) => void;

const Breakpoints = {
  XSmall: '(max-width: 599.99px)',
  Small: '(min-width: 600px) and (max-width: 959.99px)',
  Medium: '(min-width: 960px) and (max-width: 1279.99px)',
  Large: '(min-width: 1280px)',
};

const xSmallMedia = window.matchMedia(Breakpoints.XSmall);
const smallMedia = window.matchMedia(Breakpoints.Small);
const mediumMedia = window.matchMedia(Breakpoints.Medium);
const largeMedia = window.matchMedia(Breakpoints.Large);

const handlers = new Set<Handler>();

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addEventListener('change', () => {
    handlers.forEach((handler) => handler());
  });
});

export const sizes = () => ({
  'screen-x-small': xSmallMedia.matches,
  'screen-small': smallMedia.matches,
  'screen-medium': mediumMedia.matches,
  'screen-large': largeMedia.matches,
});

function getScreenSizeInfo(): ScreenSizeInfo {
  const screenSizes: {[key: string]: boolean} = sizes();
  return {
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
