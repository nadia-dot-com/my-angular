import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'svg[icon]',
  templateUrl: './svg-icon.html',
})
export class SvgIcon {
  icon = input<string>('');

  get href() {
    return `/assets/svg/${this.icon()}.svg#${this.icon()}`
  }

}
