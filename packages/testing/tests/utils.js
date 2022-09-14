import { ClientFunction } from 'testcafe';
import { fakeScreenSize } from '../config';

export const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});

export const toggleCommonConfiguration = async (
  t, url, embedded, setEmbedded, screenMode, timeout, isDoubleResize,
) => {
  await t.resizeWindow(...screenMode);

  await t.navigateTo(url);

  await toogleEmbeddedClass(embedded);
  if (embedded && isDoubleResize) {
    await t.resizeWindow(...fakeScreenSize);
    await t.resizeWindow(...screenMode);
  }

  setEmbedded(t, embedded, screenMode);

  await t.wait(timeout);
};
