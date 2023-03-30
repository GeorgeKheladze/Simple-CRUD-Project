import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormatter'
})
export class PhoneNumberFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }
}
