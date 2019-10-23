import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Observable, of } from 'rxjs';
import { News } from '../model/new.model';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  template: `
    <div class="container-news" *ngIf="error === false" fxLayout="row wrap" fxLayoutAlign="center center">

      <div *ngFor="let n of lastNews$ | async" class="item-news" style="padding: 10px;" fxFlex="1 1 25%" fxFlex.lt-md="1 1 100%">
        <h2 class="mat-h2">{{n.title}}</h2>
        <p>{{n.content}}</p>

        <a mat-button [href]="n.link" target="_blank">{{"read" | transloco}}</a>
      </div>
    </div>

    <div class="container-news" *ngIf="error === true" fxLayout="row wrap" fxLayoutAlign="center center">

      <div style="padding: 10px;" fxFlex="1 1 70%" fxFlex.lt-md="1 1 100%">
        <h2 class="mat-h2">{{"error_news" | transloco}}</h2>
      </div>

    </div>
  `,
  styles: [`
    .container-news {
      padding: 0px 30px 30px 30px;
    }
  `]
})
export class NewsComponent implements OnInit {

  lastNews$: Observable<News[]>;

  error = false;

  constructor(
    private newService: NewsService
  ) { }

  ngOnInit() {

    this.lastNews$ = this.newService.getLastNews().pipe(
      catchError(err => {
        console.log('Error is handled');
        this.error = true;
        return of([]);
      }),
      finalize(() => {
        console.log('finalize')
   })
    );
  }

}
