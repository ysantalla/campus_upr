import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@app/shared/components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatMenuModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatListModule,
  MatExpansionModule,
  MatGridListModule,
  MatChipsModule,
  MatAutocompleteModule

} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SizePipe } from './pipes/size.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    TranslocoModule,

    RouterModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    TranslocoModule,
    CarouselModule,

    LayoutComponent,
    SizePipe
  ],
  declarations: [LayoutComponent, NavMenuComponent, SizePipe],
  providers: [],
  entryComponents: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
