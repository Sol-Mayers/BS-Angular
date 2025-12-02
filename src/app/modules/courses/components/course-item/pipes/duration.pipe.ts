import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const getEndingMinutes = (num: string): string => {
      const last = num[num.length - 1];
      if (last == '1') {
        return 'минута';
      } else if (last == '2' || last == '3' || last == '4') {
        return 'минуты';
      } else {
        return 'минут';
      }
    };

    const getEndingHours = (num: string): string => {
      const last = num[num.length - 1];
      if (last == '1') {
        return 'час';
      } else if (last == '2' || last == '3' || last == '4') {
        return 'часа';
      } else {
        return 'часов';
      }
    };

    if (minutes < 60) {
      return minutes + getEndingMinutes(String(minutes));
    } else {
      const hoursResult = Math.floor(minutes / 60);
      const minutesResult = minutes % 60;

      return `${hoursResult} ${getEndingHours(
        String(hoursResult)
      )} ${minutesResult} ${getEndingMinutes(String(minutesResult))}`;
    }
  }
}
