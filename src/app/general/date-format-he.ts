import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from "@angular/core";

@Injectable()
export class DateFormatHe extends NativeDateAdapter {
    useUtcForDisplay = true;

    parse(value: any): Date | null {
        if (value == "")
            return null;

        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');
            const yyyy = Number(str[2]);
            const MM = Number(str[1]) - 1;
            const dd = Number(str[0]);

            if (dd > 0 && dd <= 31 && MM > 0 && MM < 12 && yyyy >= 1900 && yyyy <= 2100) {
                return new Date(yyyy, MM, dd);
            }
            return new Date("");
        }
    }

    format(date: Date, displayFormat: object): string{
        var day: number;
        var month: number;
        var year: number;

        for(let obj in displayFormat){
            if(obj === "day"){
                day = date.getDate();
            }
            else if (obj === "month"){
                month = date.getMonth() + 1;
            }
            else if (obj === "year"){
                year = date.getFullYear();
            }
            continue;
        }
        if(day)
            return `${this._to2digit(day)}/${this._to2digit(month)}/${year}`;
        else
            return `${this.getMonthNames('short')[month - 1]} ${year}`;
    }

    private _to2digit(n: number){
        return ('00' + n).slice(-2);
    }
}