import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
})

export class UserAvatarComponent {
  @Input() dataLetters: string | null;
}

