import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../model/new.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getLastNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(env.newsUrl).pipe(
      map((data: any[]) => {

        const listNews: News[] = [];

        data.forEach(news => {

          const title = news.title.rendered;
          let content = news.excerpt.rendered.replace(/(<[^>]+>|<[^>]>|<\/[^>]>)/g, '');
          content = content.replace('[&hellip;]', '...');
          const link = news.link;

          listNews.push(
            {
              title,
              content,
              link
            }
          );
        });
        return listNews;
      })
    );
  }
}
