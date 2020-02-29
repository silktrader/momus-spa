import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReviewSet } from 'src/app/models/review-set';
import { SortOrder } from 'src/app/models/sort-order.enum';
import { BookService } from 'src/app/services/book.service';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookReviewsComponent implements OnInit, OnDestroy {
  finishedYears: Array<string>;
  yearSelector = new FormControl();

  sortCriterium: 'date' | 'rating' | 'hours' = 'date';
  sortOrder: SortOrder = SortOrder.Ascending;

  readonly reviews$: BehaviorSubject<ReviewSet> = new BehaviorSubject(new ReviewSet([]));

  metrics: {
    readonly books: number;
    readonly words: number;
    readonly hours: number;
    readonly totalRating: number;
    readonly ratingsDeviation: number;
  };

  private subscription = new Subscription();

  constructor(private bs: BookService, private as: AuthenticationService) {}

  public get admin$() {
    return this.as.admin$;
  }

  ngOnInit() {
    // watch the year selector for changes and download new book details as required
    this.subscription.add(
      this.yearSelector.valueChanges.subscribe(yearSelected => {
        this.bs.getBooks(yearSelected).subscribe(books => {
          this.reviews$.next(new ReviewSet(books));
          this.updateBooks();
        });
      })
    );

    this.subscription.add(
      this.bs.getFinishedYears().subscribe(years => {
        this.finishedYears = years.map(this.parseYear);
        // set the initial year selection
        this.yearSelector.setValue(this.parseYear(years[0]));
      })
    );

    this.subscription.add(
      this.reviews$.subscribe(reviews => {
        this.calculateMetrics(reviews);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateBooks() {
    this.reviews$.next(
      this.reviews$.value
        // .filterYear([this.selectedYear$.value])
        .sort(this.sortCriterium, this.sortOrder)
    );
  }

  calculateMetrics(reviews: ReviewSet) {
    const metrics = { books: 0, words: 0, hours: 0, totalRating: 0, ratingsDeviation: 0 };

    if (reviews === undefined) {
      this.metrics = metrics;
      return;
    }
    for (const book of reviews.data) {
      metrics.books += 1;
      metrics.words += book.words;
      metrics.hours += book.hours;
      metrics.totalRating += book.rating;
    }

    // calculate ratings standard deviation
    let totalMeanDifference = 0;
    const averageRating = metrics.totalRating / metrics.books;
    for (const book of reviews.data) {
      totalMeanDifference += Math.pow(book.rating - averageRating, 2);
    }
    metrics.ratingsDeviation = Math.sqrt(totalMeanDifference / metrics.books);

    // assign the result
    this.metrics = metrics;
  }

  toggleSortOrder() {
    if (this.sortOrder === SortOrder.Ascending) {
      this.sortOrder = SortOrder.Descending;
    } else {
      this.sortOrder = SortOrder.Ascending;
    }

    this.updateBooks(); // the bit about filtering is unnecessary, split? tk
  }

  parseYear(year: number | null): string {
    return year ? year.toString() : 'Unknown';
  }
}
