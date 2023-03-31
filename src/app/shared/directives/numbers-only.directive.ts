import { Directive, HostListener } from '@angular/core';
@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor() {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    inputValue = inputValue.replace(/(\d{3})(?=\d)/g, '$1 ');
    event.target.value = inputValue;
  }
}
