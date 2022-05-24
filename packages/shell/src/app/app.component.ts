import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import allThemes from './themes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public sanitizer: DomSanitizer) {}

  title = 'shell';

  approaches = ['angular', 'react', 'vue'];

  approach = 'angular';

  views = ['home', 'profile', 'tasks'];

  view = 'home';

  themes = allThemes;

  theme = 'generic.light';

  approachSelectBoxOptions = {
    items: this.approaches,
    value: this.approach,
    width: 200,
    onValueChanged: (e: any) => { this.approach = e.value; },
  };

  themeSelectBoxOptions = {
    items: this.themes,
    value: this.theme,
    width: 200,
    onValueChanged: (e: any) => { this.theme = e.value; },
  };

  viewChanged(e: any) {
    this.view = e.addedItems[0];
  }
}
