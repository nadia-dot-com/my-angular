import { SvgIcon } from '@/app/components/svg-icon/svg-icon';
import { Component, signal } from '@angular/core';

@Component({
  imports: [SvgIcon],
  selector: 'app-avatar-upload',
  styleUrl: './avatar-upload.scss',
  templateUrl: './avatar-upload.html',
})
export class AvatarUpload {
  preview = signal<string>('/assets/images/avatar.png');

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file);
  }
}
