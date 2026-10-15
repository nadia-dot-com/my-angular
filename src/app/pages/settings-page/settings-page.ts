import { ProfileHeader } from '@/app/components/profile-header/profile-header';
import { ProfileService } from '@/app/services/profile';
import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUpload } from './avatar-upload/avatar-upload';

@Component({
  imports: [ReactiveFormsModule, AvatarUpload],
  selector: 'app-settings-page',
  styleUrl: './settings-page.scss',
  templateUrl: './settings-page.html',
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload;

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      })
    });
  }

  ngAfterViewInit() {
    this.avatarUploader.avatar
  }

  async onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return;

    if(this.avatarUploader.avatar) {
      await firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    console.log(this.avatarUploader.avatar)

    //@ts-ignore
    await firstValueFrom(this.profileService.patchProfile({ ...this.form.value, stack: this.splitStack(this.form.value.stack) }));
  }

  splitStack(stack: string | null | []): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | []) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
