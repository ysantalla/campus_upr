import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { environment as env } from '@env/environment';

import { Menu } from '@app/core/models/menu.model';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport="false"
        attr.role="navigation"
        mode="over"
        [opened]="(isHandset$ | async) === false && (isLoggedIn$ | async)">
        <mat-toolbar class="navbar-sidebar">
          <img class="logo-sidenav" src="./assets/img/logo-350x89.png" />
        </mat-toolbar>

        <nav class="nav-sidebar">
          <app-nav-menu [items]="nav"></app-nav-menu>

          <app-nav-menu [items]="dashboard" *ngIf="(isLoggedIn$ | async)"></app-nav-menu>

          <app-nav-menu [items]="about"></app-nav-menu>
        </nav>

      </mat-sidenav>
      <mat-sidenav-content>
      <mat-toolbar class="" style="background-color: white;" [@fadeInOut]>
        <mat-toolbar-row>
          <picture [fxHide.lt-lg]="true">
            <img class="logo" src="./assets/img/logo-350x89.png">
          </picture>
          <span class="spacer"></span>
          <div class="search">
            <mat-icon label="search">search</mat-icon>
            <input type="search" [placeholder]="'search' | transloco" class="search">
          </div>
          <span class="spacer"></span>

          <ul class="social-buttons">
            <li>
              <a matTooltip="Facebook" href="https://www.facebook.com/UprCuba/">
                <img width="40" src="./assets/img/social-icons/facebook.svg" />
              </a>
            </li>
            <li>
              <a matTooltip="Twitter" href="https://twitter.com/upr_cuba">
                <img width="40" src="./assets/img/social-icons/twitter.svg" />
              </a>
            </li>
            <li>
              <a [matTooltip]="'contacts' | transloco" href="http://directorio.upr.edu.cu">
                <img width="40" src="./assets/img/social-icons/phone-book.svg" />
              </a>
            </li>
          </ul>
        </mat-toolbar-row>
      </mat-toolbar>

      <!-- this is the sticky menu -->
      <header class="tabs is-centered is-fullwidth" #stickyMenu [class.sticky] = "sticky">

        <mat-toolbar class="navbar" color="primary" [@fadeInOut]>
          <mat-toolbar-row>
            <button
              type="button"
              aria-label="Toggle sidenav"
              class="toggle"
              [fxHide]="true"
              [fxShow.lt-lg]="true"
              mat-icon-button
              (click)="drawer.toggle()">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>

            <nav class="nav-items" [fxHide.lt-lg]="true">

              <button mat-button routerLink="/home" routerLinkActive="active">
                <span class="text-button hand">{{"home" | transloco}}</span>
              </button>

              <button mat-button routerLink="/university" routerLinkActive="active">
                <span class="text-button">{{"university" | transloco}}</span>
              </button>

              <button mat-button routerLink="/teaching" routerLinkActive="active">
                <span class="text-button">{{"teaching" | transloco}}</span>
              </button>

              <button mat-button routerLink="/investigation" routerLinkActive="active">
                <span class="text-button">{{"investigation" | transloco}}</span>
              </button>

              <button mat-button routerLink="/internationalization" routerLinkActive="active">
                <span class="text-button">{{"internationalization" | transloco}}</span>
              </button>

              <button mat-button routerLink="/extension" routerLinkActive="active">
                <span class="text-button">{{"extension" | transloco}}</span>
              </button>

              <button mat-button routerLink="/services" routerLinkActive="active">
                <span class="text-button">{{"services" | transloco}}</span>
              </button>
            </nav>

            <span class="spacer"></span>

            <button mat-button (click)="changeLang()">
              <span class="text-button">{{language}}</span>
            </button>

            <button mat-button [matMenuTriggerFor]="menu">
              <span *ngIf="(isLoggedIn$ | async)">Bienvenido {{username$ | async}}</span>
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <a mat-menu-item *ngIf="isLoggedIn$ | async" target="_blank" href="https://clave.upr.edu.cu/iisadmpwd/">
                <mat-icon>lock_open</mat-icon>
                <span>{{"change_password" | transloco}}</span>
              </a>

              <button mat-menu-item *ngIf="isLoggedIn$ | async" routerLink="auth/profile">
                <mat-icon>person</mat-icon>
                <span>{{"profile" | transloco}}</span>
              </button>

              <mat-divider *ngIf="isLoggedIn$ | async"></mat-divider>

              <button mat-menu-item *ngIf="isLoggedIn$ | async"  (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                <span>{{"logout" | transloco}}</span>
              </button>

              <button mat-menu-item *ngIf="((isLoggedIn$ | async) === false)" routerLink="auth/login">
                <mat-icon>lock_open</mat-icon>
                <span>{{"login" | transloco}}</span>
              </button>
            </mat-menu>

          </mat-toolbar-row>
        </mat-toolbar>
      </header>

        <div class="layout">
          <div class="router">
            <div class="item">
              <router-outlet></router-outlet>
            </div>
          </div>

          <br/>


          <footer class="footer">
            <mat-toolbar>
              <span>{{appName}} &#169; {{year}} - {{"footer" | transloco}}</span>
            </mat-toolbar>
          </footer>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      min-height: 98vh;
      height: auto;
      overflow-y: auto;
    }

    .item {
      min-height: 90vh;
    }

    .mat-button {
      font-size: 18px;
      font-weight: 500;
      border-radius: 0px;
    }

    .mat-drawer-content {
      overflow: hidden;
    }

    .social-buttons > li {
      position: relative;
      float: left;
      margin: 3px;
    }

    .social-buttons {
      list-style-type: none;
      padding-top: 10px;
      margin: 0px;
    }

    .search {
        background-color: rgb(197, 197, 197);
        border-radius: 2px;
        display: flex;
        flex-direction: row;
        padding-left: 6px;
        padding-right: 6px;
        width: 40vw;
    }

    .search > mat-icon {
      margin-top: 8px;
    }

    input {
      border: 0;
      color: rgba(0,0,0,.87);
      font-size: 16px;
      outline: 0;
      padding: 10px;
      width: 100%;
    }

    .sticky{
      position: fixed;
      top: 0;
      overflow: hidden;
      z-index: 1024;
      width: 100%;
      box-shadow: 0 1px 2px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    }

    .nav-sidebar {
      min-height: auto;
      height: 92vh;
      overflow-x: hidden;
      overflow-y: auto;
      display: block;
    }

    .sidenav-container {
      height: 100%;
    }

    .text-button {
      text-transform: uppercase;
      color: white;
    }

    .navbar {
      box-shadow: 0 1px 2px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
      position: sticky;
      z-index: 1025;
    }

    button.toggle {
      color: white;
      cursor: pointer;
    }

    .navbar-sidebar {
      box-shadow: 0 1px 2px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    }

    mat-sidenav {
      position: fixed;
    }

    .logo-sidenav {
      width: 230px;
      padding-right: 10px;
      padding-left: 10px;
    }

    .mat-toolbar-row, .mat-toolbar-single-row {
      height: 64px;
    }

    .logo {
      width: 245px;
      padding-top: 9px;
    }

    mat-toolbar button.active, mat-toolbar a.active {
      color: white;
      background: rgba(27, 26, 26, 0.2);
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    mat-toolbar button.mat-button, mat-toolbar a.mat-button {
      color: white;
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    a.active {
      background: rgba(27, 26, 26, 0.2);
    }

    footer > .mat-toolbar {
      white-space: normal;
      padding-top: 20px;
      height: 80px;
    }

    .mat-list, .mat-nav-list {
      padding-top: 3px;
      padding-bottom: 3px;
      display: block;
    }

  `],
  animations: [
    trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1000)),
  ]),
]
})
export class LayoutComponent implements OnInit, AfterViewInit {

  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  @Input() language: string;
  @Output() switchLang = new EventEmitter();

  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  sticky = false;
  elementPosition: any;

  dashboard: Menu;
  about: Menu;

  nav: Menu;

  envName = env.envName;
  appName = env.appName;
  year = new Date().getFullYear();
  isProd = env.production;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {

    this.dashboard = {
      heading: 'dashboard',
      icon: 'dashboard',
      link: '/dashboard',
      pages: []
    };

    this.about = {
      heading: 'about',
      icon: 'person',
      link: '/about',
      pages: []
    };

    this.nav = {
      heading: 'home',
      icon: '',
      link: '',
      pages:  [
        {
          heading: 'home',
          icon: '',
          link: '',
          pages: []
        },
        {
          heading: 'university',
          icon: '',
          link: '/university',
          pages: []
        },
        {
          heading: 'teaching',
          icon: '',
          link: '/teaching',
          pages: []
        },
        {
          heading: 'investigation',
          icon: '',
          link: '/investigation',
          pages: []
        },
        {
          heading: 'internationalization',
          icon: '',
          link: '/internationalization',
          pages: []
        },
        {
          heading: 'extension',
          icon: '',
          link: '/extension',
          pages: []
        },
        {
          heading: 'services',
          icon: '',
          link: '/services',
          pages: []
        }
      ]
    };

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.username$ = this.authService.getUsername();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll() {
      const windowScroll = window.pageYOffset;
      if (windowScroll >= this.elementPosition) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Usted a cerrado su sesión', 'X', {duration: 3000});
    this.router.navigate(['auth', 'login']);
  }

  changeLang(): void {
    this.switchLang.emit(this.language);
  }

}
