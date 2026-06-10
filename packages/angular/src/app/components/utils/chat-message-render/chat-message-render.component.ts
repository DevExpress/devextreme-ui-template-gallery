import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { micromark } from 'micromark';

@Component({
  selector: 'chat-message-render',
  template: '<span [innerHTML]="renderedHtml"></span>',
  styleUrls: ['./chat-message-render.component.scss'],
})
export class ChatMessageRenderComponent implements OnChanges {
  @Input() text = '';

  renderedHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    const html = micromark(this.text);
    const trimmed = html.replace(/^<p>/, '').replace(/<\/p>$/, '');
    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(trimmed);
  }
}
