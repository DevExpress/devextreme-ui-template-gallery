import { Component, Input, OnChanges, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { micromark } from 'micromark';

@Component({
  selector: 'chat-message-render',
  template: '<span [innerHTML]="renderedHtml"></span>',
  styleUrls: ['./chat-message-render.component.scss'],
})
export class ChatMessageRenderComponent implements OnChanges {
  @Input() text = '';

  renderedHtml = '';

  private sanitizer = inject(DomSanitizer);

  ngOnChanges() {
    const html = micromark(this.text);
    const trimmed = html.replace(/^<p>/, '').replace(/<\/p>$/, '');
    this.renderedHtml = this.sanitizer.sanitize(SecurityContext.HTML, trimmed) ?? '';
  }
}
