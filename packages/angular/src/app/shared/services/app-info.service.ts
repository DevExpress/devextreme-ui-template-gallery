import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'UI Templates Gallery';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
