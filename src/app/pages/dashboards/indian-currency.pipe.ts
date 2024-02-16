import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency'
})
export class IndianCurrencyPipe implements PipeTransform {

  
  transform(value: number): string {
    if (isNaN(value)) return '';

    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + ' Crore';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2) + ' Lakh';
    } else {
      return value.toFixed(2);
    }
  }

}
