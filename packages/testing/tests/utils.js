import { ClientFunction, location } from 'testcafe';

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

export const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

export const getPostfix = (embedded) => {
  const theme = process.env.theme;
  const screenMode = process.env.screenMode;
  // TO DO const device = process.env.device;

  return `-embed=${embedded}-${theme}-${screenMode}`;
};

export const toggleCommonConfiguration = async (
  t, url, embedded, setEmbedded, timeout, requestLogger,
) => {
  await t.navigateTo(url);
  if(process.env.screenMode === 'mobile') {
    await t.eval(() => location.reload(true));
  }
  await awaitFontsLoaded(t, requestLogger);
  await toogleEmbeddedClass(embedded);

  setEmbedded(t, embedded);

  await t.wait(timeout);
};
