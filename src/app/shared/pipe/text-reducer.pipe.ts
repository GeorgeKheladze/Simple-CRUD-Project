import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textReducer'
})
export class TextReducerPipe implements PipeTransform {

  transform(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length - 3) + '...'
    }
    return text;
  }
}
