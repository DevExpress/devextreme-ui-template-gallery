import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'UI Template Gallery';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
