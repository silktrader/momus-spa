import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})
export class ThousandsPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value == null || Number.isNaN(value)) {
      return '?';
    }

    if (value < 1000) {
      return value.toString();
    }

    return Math.round(value / 1000) + 'k';
  }
}
