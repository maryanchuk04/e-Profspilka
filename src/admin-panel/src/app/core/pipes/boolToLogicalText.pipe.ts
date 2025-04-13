import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'boolToLogicalText',
})
export class BoolToLogicalTextPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Так' : 'Ні';
    }
}
