import { Directive, EventEmitter, HostBinding, HostListener, output, Output } from '@angular/core';

@Directive({
  selector: '[Dnd]',
})

export class DndDirective {
  // @Output() fileDropped = new EventEmitter<File>();
  fileDropped = output<File>();

  @HostBinding('class.fileover') fileover = false;

  @HostBinding('attr.aria-label') label = 'Upload file';

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation();

    this.fileover = true;
    this.label = 'Under drop zone';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation();

    this.fileover = false;
    this.label = 'Upload file';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation();

    this.fileover = false;
    this.label = 'Upload file';

    if (!event.dataTransfer?.files[0]) return;
    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
