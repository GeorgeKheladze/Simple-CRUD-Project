import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  regexStr = '^[0-9]+$';

  constructor() {}

  @HostListener('keypress', ['$event']) onKeyPress( event: any ) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text/plain') || (window as any).clipboardData?.getData('Text') || '';
    const cleanedData = pasteData.replace(/[^0-9]/g, '');
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    input.setRangeText(cleanedData, start, end, 'end');
    input.setSelectionRange(start + cleanedData.length, start + cleanedData.length);
  }
}
