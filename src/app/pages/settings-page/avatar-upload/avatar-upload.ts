import { SvgIcon } from '@/app/components/svg-icon/svg-icon';
import { DndDirective } from '@/app/directives/dnd';
import { Component, effect, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [SvgIcon, DndDirective, FormsModule],
  selector: 'app-avatar-upload',
  styleUrl: './avatar-upload.scss',
  templateUrl: './avatar-upload.html',
})
export class AvatarUpload {
  currentAvatarUrl = input<string | null>(null);

  preview = linkedSignal(() => this.currentAvatarUrl() ?? '/assets/images/avatar.png');
  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file || !file.type.match('image')) return;

    this.proccessFile(file);
  }

  onFileDroped(file: File | null) {
    this.proccessFile(file)
  }

  proccessFile(file: File | null) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
