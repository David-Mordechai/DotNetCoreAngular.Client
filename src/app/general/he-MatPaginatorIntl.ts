import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";

@Injectable()
export class heMatPaginatorIntl extends MatPaginatorIntl {
    itemsPerPageLabel = ' שורות לעמוד: ';
    nextPageLabel = 'הבא';
    previousPageLabel = 'קודם';

    getRangeLabel = function (page: any, pageSize: any, lenght: any) {
        if (lenght === 0 || pageSize === 0)
            return `מתוך 0 ` + lenght;

        lenght = Math.max(lenght, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < lenght ? Math.min(startIndex + pageSize, lenght) : startIndex + pageSize;
        const _startIndex = startIndex + 1;
        return 'מציג ' + _startIndex + ' עד ' + endIndex + ' מתוך ' + lenght;
    }
}  
