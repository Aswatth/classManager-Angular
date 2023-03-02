import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'Date2Time'
})
export class Date2Time implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return new Date(value).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
}