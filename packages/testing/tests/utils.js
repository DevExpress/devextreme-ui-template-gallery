import { ClientFunction } from 'testcafe';
import { DateTime } from 'luxon';
import { fakeScreenSize } from '../config';

const WAIT_ATTEMPTS = 10;

async function awaitFontsLoaded(t, requestLogger, timeout = 1000) {
  if (requestLogger) {
    // eslint-disable-next-line no-constant-condition
    for (let i = 1; i <= WAIT_ATTEMPTS; i += 1) {
      const fontURLs = requestLogger.requests
        .map(({ request }) => request.url)
        .filter((reqUrl) => reqUrl.endsWith('.woff2'));
      // eslint-disable-next-line no-await-in-loop
      await t.wait(timeout);
      if (fontURLs.some((url) => url.includes('roboto')) && fontURLs.some((url) => url.includes('dxicons'))) {
        break;
      }
      if (i === WAIT_ATTEMPTS) {
        // eslint-disable-next-line no-console
        console.log(...fontURLs);
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

export const getPostfix = (embedded, screenMode, themeMode) => {
  let theme = process.env.theme;
  theme = !themeMode ? theme : theme.replace(/\.(light|dark)$/, `.${themeMode}`);

  return `-embed=${embedded}-${theme}-${screenMode[0]}`;
};

export async function setTheme(t, theme) {
  const currentTheme = await ClientFunction(
    () => localStorage.getItem('app-theme') || 'light',
  )();

  if (currentTheme !== theme) {
    await t.click('.theme-button');
    await t.click('.header-title'); // for remove focus from theme-button
    await t.wait(1000);
  }
}

export const toggleCommonConfiguration = async (
  t,
  url,
  embedded,
  setEmbedded,
  screenMode,
  timeout,
  isDoubleResize,
  requestLogger,
) => {
  await t.resizeWindow(...screenMode);
  await t.navigateTo(url);

  await awaitFontsLoaded(t, requestLogger);
  await toogleEmbeddedClass(embedded);
  if (embedded && isDoubleResize) {
    await forceResizeRecalculation(t, screenMode);
  }
  setEmbedded(t, embedded, screenMode);

  await t.wait(timeout);
};

export const compileDateValue = () => {
  const today = DateTime.now();
  const monday = today.set({
    weekday: 1,
  });
  return monday.toFormat('yyyy/MM/dd');
};
