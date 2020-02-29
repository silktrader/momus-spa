import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ReviewSet } from 'src/app/models/review-set';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BookDetails } from 'src/app/models/book-details.model';

@Component({
  selector: 'app-spine',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelfComponent {
  @Input() reviews$: Observable<ReviewSet>;

  constructor(private router: Router) {}

  gotoBook(book: BookDetails) {
    this.router.navigate(['/books', book.url]);
  }
}
