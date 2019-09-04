import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CU';

registerLocaleData(localeCl, 'es-CU');

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guards/auth.guard';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    },
      isolate : false
    }),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      })
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-CU' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
