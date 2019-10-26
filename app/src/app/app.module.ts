import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CU';

registerLocaleData(localeCl, 'es-CU');

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '../environments/environment';

import { translocoLoader } from './core/loaders/transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/+home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/+home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/+auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'university',
    loadChildren: () => import('./views/+university/university.module').then(m => m.UniversityModule)
  },
  {
    path: 'teaching',
    loadChildren: () => import('./views/+teaching/teaching.module').then(m => m.TeachingModule)
  },
  {
    path: 'investigation',
    loadChildren: () => import('./views/+investigation/investigation.module').then(m => m.InvestigationModule)
  },
  {
    path: 'internationalization',
    loadChildren: () => import('./views/+internationalization/internationalization.module').then(m => m.InternationalizationModule)
  },
  {
    path: 'extension',
    loadChildren: () => import('./views/+extension/extension.module').then(m => m.ExtensionModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./views/+service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./views/+about/about.module').then(m => m.AboutModule)
  },
  { path: '**', redirectTo: 'error/unauthorized' }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      }),
    HttpClientModule,
    TranslocoModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-CU' }, {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        listenToLangChange: true,
        defaultLang: 'es',
        fallbackLang: 'en',
        prodMode: environment.production,
        scopeStrategy: 'shared'
      } as TranslocoConfig
    },
    translocoLoader
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
