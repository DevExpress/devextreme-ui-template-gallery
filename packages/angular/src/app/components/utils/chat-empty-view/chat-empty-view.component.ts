import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'chat-empty-view',
  templateUrl: './chat-empty-view.component.html',
  styleUrls: ['./chat-empty-view.component.scss'],
  imports: [CommonModule],
})
export class ChatEmptyViewComponent {
  @Input() texts: ChatEmptyViewTexts = {
    message: '',
    prompt: '',
  };

  @Output() promptClick = new EventEmitter<string>();

  prompts = EMPTY_VIEW_PROMPTS;
}
