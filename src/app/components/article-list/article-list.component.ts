import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  BASE_URL = 'http://localhost:3000/api';

  articles: any[] = [];
  currentPage: number = 1;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    const URL = `${ this.BASE_URL }/articles/${this.currentPage}`;
    console.log( URL );

    this.http.get<any[]>( URL ).subscribe(
      (data) => {
        console.log( data );
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
      }
    );
  }

  nextPage(): void {
    this.currentPage++;
    this.loadArticles();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadArticles();
    }
  }

  viewDetails(articleId: string): void {
    this.router.navigate(['article', articleId]);
  }
}
