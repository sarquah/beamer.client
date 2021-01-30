import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum',
})
export class EnumPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const resultArray = value.match(/[A-Z][a-z]+/g);
      if (resultArray) {
        return resultArray.reduce((total, tmpString) => {
          return total
            ? `${total} ${tmpString.toLocaleLowerCase()}`
            : `${tmpString}`;
        });
      }
    }
    return value;
  }
}
