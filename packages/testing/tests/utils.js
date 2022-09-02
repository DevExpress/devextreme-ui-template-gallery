import { ClientFunction } from 'testcafe';

export const toogleEmbeddedClass = ClientFunction((embed) => {
  if (!embed) return;
  window.document.getElementsByTagName('body')[0].classList.add('embedded');
});
