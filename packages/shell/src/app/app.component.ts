import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import allThemes from './themes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';

  approaches = ['angular', 'react', 'vue'];

  approach = 'angular';

  views = [
    'crm-contact-list',
    'crm-contact-details',
    'planning-task-list',
    'planning-task-details',
  ];

  view = 'crm-contact-list';

  themes = allThemes;

  theme = 'material.blue.light.compact';

  approachSelectBoxOptions = {
    items: this.approaches,
    value: this.approach,
    width: 200,
    onValueChanged: (e: any): void => { this.approach = e.value; },
  };

  themeSelectBoxOptions = {
    items: this.themes,
    value: this.theme,
    width: 200,
    onValueChanged: (e: any): void => { this.theme = e.value; },
  };

  constructor(public sanitizer: DomSanitizer) {}

  viewChanged(e: any): void {
    this.view = e.addedItems[0];
  }
}
