import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription, of, ReplaySubject } from 'rxjs';
import { ReviewSet } from 'src/app/models/review-set';
import { SortOrder } from 'src/app/models/sort-order.enum';
import { BookService } from 'src/app/services/book.service';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.scss']
})
export class BookReviewsComponent implements OnInit, OnDestroy {
  // reviews = new ReviewSet([
  //   {
  //     id: 1,
  //     title: 'Il cimitero di Praga',
  //     author: 'Umberto Eco',
  //     rating: 5,
  //     hours: 11,
  //     pages: 520,
  //     date: 2019,
  //     genre: 'fiction',
  //     favourite: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Le Roi de fer',
  //     author: 'Maurice Duron',
  //     rating: 3,
  //     hours: 8,
  //     pages: 423,
  //     date: 2019,
  //     genre: 'fiction'
  //   },
  //   {
  //     id: 3,
  //     title: 'Adversaire',
  //     author: 'Emmanuel Carrère',
  //     rating: 2,
  //     hours: 6,
  //     pages: 230,
  //     date: 2019,
  //     genre: 'nonfiction'
  //   },
  //   {
  //     id: 4,
  //     title: 'The Inner Game of Tennis',
  //     author: 'Timothy Gallwey',
  //     rating: 1,
  //     hours: 4,
  //     pages: 210,
  //     date: 2019,
  //     genre: 'nonfiction'
  //   },
  //   {
  //     id: 5,
  //     title: 'Tractatus Logico-Philosphicus',
  //     author: 'Ludwig Wittgenstein',
  //     rating: 2,
  //     hours: 7,
  //     pages: 250,
  //     date: 2019,
  //     genre: 'philosophy'
  //   },
  //   ,
  //   {
  //     id: 6,
  //     title: 'The Hundred Years War: Trial by Battle',
  //     author: 'Jonathan Sumption',
  //     rating: 3,
  //     hours: 13,
  //     pages: 450,
  //     date: 2018,
  //     genre: 'history'
  //   },
  //   {
  //     id: 7,
  //     title: 'The Hundred Years War: Trial by Fire',
  //     author: 'Jonathan Sumption',
  //     rating: 3,
  //     hours: 13,
  //     pages: 450,
  //     date: 2018,
  //     genre: 'history'
  //   },
  //   ,
  //   {
  //     id: 8,
  //     title: 'Seta',
  //     author: 'Alessandro Baricco',
  //     rating: 1,
  //     hours: 2,
  //     pages: 150,
  //     date: 2018,
  //     genre: 'fiction'
  //   }
  // ]);

  // selectedYear$ = new ReplaySubject<number | null>();
  // selectedYear: number | null;
  finishedYears: Array<string>;
  yearSelector = new FormControl();

  sortCriterium: 'date' | 'rating' | 'hours' = 'date';
  sortOrder: SortOrder = SortOrder.Ascending;

  reviews: BehaviorSubject<ReviewSet> = new BehaviorSubject(new ReviewSet([]));
  filteredReviews: BehaviorSubject<ReviewSet> = new BehaviorSubject(new ReviewSet([])); // tk can remove?

  metrics: {
    books: number;
    words: number;
    hours: number;
    totalRating: number;
    ratingsDeviation: number;
  };
  subscription = new Subscription();

  constructor(private bs: BookService) {}

  ngOnInit() {
    // watch the year selector for changes and download new book details as required
    this.subscription.add(
      this.yearSelector.valueChanges.subscribe(yearSelected => {
        this.bs.getBooks(yearSelected).subscribe(books => {
          this.reviews.next(new ReviewSet(books));
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
      this.filteredReviews.subscribe(reviews => {
        this.calculateMetrics(reviews);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateBooks() {
    this.filteredReviews.next(
      this.reviews.value
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
    if (year) {
      return year.toString();
    }
    return 'Unknown';
  }
}
