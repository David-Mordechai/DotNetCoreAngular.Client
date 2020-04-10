import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuLink } from '../models/menuLink';
import { Observable, of, Subject } from 'rxjs';

const MenuData: Array<Menu> = [
  new Menu('טבלאות', 'table_chart', [
    new MenuLink('/basictable', 'טבלה בסיסית'),
    new MenuLink('/materialtable', 'טבלה מתקדמת')
  ]),
  new Menu('טפסים', 'content_paste', [
    new MenuLink('/materialform', 'טופס לדוגמה'),
  ]),
  new Menu('עצים', 'content_paste', [
    new MenuLink('/materialtree', 'עץ מקונן'),
  ]),
];

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menu = new Subject<Menu[]>();
  menu = this._menu.asObservable();

  constructor() {
    
  }

  loadMenu(){
    this.getMenus().subscribe(menus => {
      this._menu.next(MenuData);
    });
  }

  private getMenus(): Observable<Menu[]> {
    return of(MenuData);
  }
}
