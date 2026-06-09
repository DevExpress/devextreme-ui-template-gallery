import './chatMessageRender.scss';

import { ChatTypes } from 'devextreme-react/chat';
import HTMLReactParser from 'html-react-parser';
import { micromark } from 'micromark';

const convertToHtml = (text: string) => {
  const html = micromark(text);
  return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
};

export const messageRender = (data: ChatTypes.MessageTemplateData) => {
  return HTMLReactParser(convertToHtml(data.message!.text!));
};
