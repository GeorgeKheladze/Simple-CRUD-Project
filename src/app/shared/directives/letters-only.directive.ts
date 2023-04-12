import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[lettersOnly]'
})
export class LettersOnlyDirective {

  constructor( private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Zა-ჰ ]*/g, '');
    if ( initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
