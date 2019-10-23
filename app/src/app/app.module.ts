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
import { AuthGuard } from '@app/core/guards/auth.guard';
import { environment } from '../environments/environment';

import { translocoLoader } from './core/loaders/transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/+home/home.module').then(m => m.HomeModule)
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
