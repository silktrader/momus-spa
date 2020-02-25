import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { BookDetails } from 'src/app/models/book-details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestReviews$: Observable<Array<BookDetails>>;

  constructor(private bs: BookService) {}

  ngOnInit() {
    this.latestReviews$ = this.bs.getLatestBooks(7);
  }
}
