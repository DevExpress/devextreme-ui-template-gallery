import './ChatEmptyView.scss';

import React from 'react';

export type ChatEmptyViewTexts = {
  message: string;
  prompt: string;
};

type ChatEmptyPrompt = {
  id: 'trends' | 'predictions';
  title: string;
  description: string;
  messageText: string;
};

type ChatEmptyViewProps = {
  texts: ChatEmptyViewTexts;
  onPromptClick: (messageText: string) => void;
};

const EMPTY_VIEW_PROMPTS: ChatEmptyPrompt[] = [
  {
    id: 'trends',
    title: '🎯 Trends',
    description: 'Identify trends in your business',
    messageText: 'Identify trends in the business shown in this dashboard.',
  },
  {
    id: 'predictions',
    title: '📊 Predictions',
    description: 'Predict which deals are at risk of closing',
    messageText: 'Predict which deals are at risk of closing based on this dashboard.',
  },
];

export const ChatEmptyView = ({ texts, onPromptClick }: ChatEmptyViewProps) => {
  return (
    <div
      className='chat-empty-view'
      aria-label={`${texts.message}. ${texts.prompt}`}
    >
      <div className='chat-empty-view__header'>
        <div className='chat-empty-view__title'>Ask AI Assistant</div>
      </div>

      <div className='chat-empty-view__prompts'>
        {EMPTY_VIEW_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            type='button'
            className='chat-empty-view__prompt'
            onClick={() => onPromptClick(prompt.messageText)}
            aria-label={`${prompt.title}. ${prompt.description}`}
          >
            <span className='chat-empty-view__prompt-content'>
              <span className='chat-empty-view__prompt-title'>{prompt.title}</span>
              <span className='chat-empty-view__prompt-description'>
                {prompt.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
