import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent {
  BASE_URL = 'http://localhost:3000/api';

  article: any;
  previousArticle: any;
  nextArticle: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleId = params['id'];

      this.loadArticle(articleId);
    });
  }

  loadArticle( articleId: string ): void {
    this.http.get<any>(`${ this.BASE_URL }/article/${ articleId }`).subscribe(
      (data) => {
        console.log( data );
        this.article = data.article;
        this.previousArticle = data.previousArticle;
        this.nextArticle = data.nextArticle;
      },
      (error) => {
        console.error('Error loading article details', error);
      }
    );
  }

  logRouterLink(route: string): void {
    console.log('Ruta del enlace:', route);
  }
}
