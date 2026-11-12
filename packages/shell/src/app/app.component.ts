import { Component, computed, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import allThemes from './themes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'shell';

  approaches = ['angular', 'react', 'vue'];

  approach = signal('angular');

  views = [
    'crm-contact-list',
    'crm-contact-details',
    'planning-task-list',
    'planning-task-details',
  ];

  view = signal('crm-contact-list');

  themes = allThemes;

  theme = signal('material.blue.light.compact');

  approachSelectBoxOptions = {
    items: this.approaches,
    value: this.approach(),
    width: 200,
    onValueChanged: (e: any): void => { this.approach.set(e.value); },
  };

  themeSelectBoxOptions = {
    items: this.themes,
    value: this.theme(),
    width: 200,
    onValueChanged: (e: any): void => { this.theme.set(e.value); },
  };

  frameUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://devexpress.github.io/devextreme-ui-template-gallery/${this.theme()}/${this.approach()}/embedded/#/${this.view()}`,
  ));

  constructor(public sanitizer: DomSanitizer) {}

  viewChanged(e: any): void {
    this.view.set(e.addedItems[0]);
  }
}
