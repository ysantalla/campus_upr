import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/core/services/auth.service';

import { environment as env } from '@env/environment';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout [language]="activeLang" (switchLang)="switchLang($event)"></app-layout>  `,
  styles: [`
  `],
})
export class AppComponent implements OnInit {
  envName = env.envName;
  appName = env.appName;

  title: string;

  public activeLang: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.activeLang = this.authService.getLanguage();
    this.translate.setDefaultLang(this.activeLang);
    this.translate.use(this.activeLang);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event) {
        this.translate.get(`app.${this.title}`).subscribe((title: string) => {
          this.titleService.setTitle(title ? `${title} - ${env.appName}` : env.appName);
        });
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;

        this.title = title;

        this.translate.get(`app.${title}`).subscribe(data => {
          this.titleService.setTitle(
            title ? `${data} - ${env.appName}` : env.appName
          );
        });
      });

  }

  switchLang($lang: string): void {
    this.activeLang = $lang === 'es' ? 'en' : 'es';
    this.translate.use(this.activeLang);
    this.authService.setLanguage(this.activeLang);
  }
}
