import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from '../../services/menu.service';
import { ThemeService } from 'src/app/modules/core/services/theme.service';
import { Menu } from '../../models/menu';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  opened = true;
  menus: Menu[];
  expandedIndex: number = 0;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('settingsSidenav', { static: true }) settingsSidenav: MatSidenav;

  constructor(public menuService: MenuService, public themeService: ThemeService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkExpandIndex(event.url);
      }
    })
  }

  private checkExpandIndex(url: string) {
    let foundIndex: number = -1;
    if (this.menus == null)
      return;
    
    this.menus.forEach((menu, index) => {
      if (menu.menuLinks.some(menuLink => url.indexOf(menuLink.link) != -1)) {
          foundIndex = index;
      }
    });
    setTimeout(() => {
      this.expandedIndex = foundIndex;
    }, 0);
  }

  onclick(i: number, panel: any) {
    if (this.expandedIndex === i)
      panel.open();
  }

  mouseLeave(i: number, panel: any) {
    if (this.expandedIndex !== i)
      panel.close();
  }

  mouseEnter(i: number, panel: any) {
    if (this.expandedIndex !== i)
      panel.open();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  ngOnInit() {

    this.menuService.menu.subscribe((result) => {
      this.menus = result;
      this.checkExpandIndex(this.router.url);
    });
    this.menuService.loadMenu();

    if (window.innerWidth < 768) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  public onToggleSideNav = (settings: any) => {
    if (settings)
      this.settingsSidenav.toggle()
    else
      this.sidenav.toggle();
  }
}
