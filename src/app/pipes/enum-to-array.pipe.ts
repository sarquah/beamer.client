import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value)
      .filter((x) => !isNaN(+x))
      .map((x) => {
        return { index: +x, name: value[x] };
      });
  }
}
