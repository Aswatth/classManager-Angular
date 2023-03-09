import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ddMMMyyyy'
})
export class DateFormatter implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return new Date(value).toLocaleString('en-US', { day: 'numeric', month: 'short', year:'numeric', hour12: true });
    }
}