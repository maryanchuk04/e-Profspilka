import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'utcToLocal',
})
export class UtcToLocalPipe implements PipeTransform {
    transform(value: string | Date | null | undefined, format?: Intl.DateTimeFormatOptions): string {
        if (!value) return 'Не визначено';

        const date = new Date(value);

        const options: Intl.DateTimeFormatOptions = format ?? {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        return date.toLocaleString(undefined, options);
    }
}
