import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
})
export class HighlightCompletedTodo {
  isCompleted = input(false);
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = "line-through";
      this.el.nativeElement.style.backgroundColor = "#d2a5ca";
      this.el.nativeElement.style.color = "black";
    }
  })
}
