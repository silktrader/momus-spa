import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';
import { BookDetails } from 'src/app/models/book-details.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book$: Observable<Book>;

  public get shortUrl(): string {
    return this.route.snapshot.params.shortUrl;
  }

  public get admin$() {
    return this.as.admin$;
  }

  constructor(
    private bs: BookService,
    private as: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.book$ = this.bs.getBook(this.shortUrl);
  }

  public categoryLabel(label: string): string {
    return BookDetails.categoryLabel(label);
  }
}
