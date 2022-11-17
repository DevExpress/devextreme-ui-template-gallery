import { ClientFunction } from 'testcafe';
import { fakeScreenSize } from '../config';

const FONTSCOUNT = 4;
export async function awaitFontsLoaded(t, requestLogger, timeout) {
  if (requestLogger) {
  // eslint-disable-next-line no-constant-condition
    while (true) {
      const fontsCount = requestLogger.requests
        .map(({ request }) => request.url)
        .filter((reqUrl) => reqUrl.endsWith('.woff2'));
      // eslint-disable-next-line no-await-in-loop
      await t.wait(timeout);
      if (fontsCount.length >= FONTSCOUNT) {
        break;
      }
    }
  }
}

export async function forceResizeRecalculation(t, screenMode) {
  await t.resizeWindow(...fakeScreenSize);
  await t.resizeWindow(...screenMode);
}

export const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

export const getPostfix = (embedded, screenMode) => {
  const theme = process.env.theme;
  return `-embed=${embedded}-${theme}-${screenMode[0]}`;
};

export const toggleCommonConfiguration = async (
  t, url, embedded, setEmbedded, screenMode, timeout, isDoubleResize,
) => {
  await t.resizeWindow(...screenMode);

  await t.navigateTo(url);
  await toogleEmbeddedClass(embedded);
  if (embedded && isDoubleResize) {
    await forceResizeRecalculation(t, screenMode);
  }
  setEmbedded(t, embedded, screenMode);

  await t.wait(timeout);
};
