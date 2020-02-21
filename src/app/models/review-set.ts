import { BookDetails } from 'src/app/models/book-details.model';
import { throwError } from 'rxjs';
import { SortOrder } from './sort-order.enum';

export class ReviewSet {
  public get data() {
    return this.reviews;
  }

  constructor(private reviews: Array<BookDetails>) {}

  filterYear(years: Array<number | null>): ReviewSet {
    return new ReviewSet(
      this.reviews.filter(review =>
        years.includes(review.finished !== null ? review.finished.getFullYear() : null)
      )
    );
  }

  private sortDate(order: SortOrder): ReviewSet {
    return this.order(
      [...this.reviews].sort((a, b) => a.finished.getFullYear() - b.finished.getFullYear()),
      order
    );
  }

  private sortRating(order: SortOrder): ReviewSet {
    return this.order(
      [...this.reviews].sort((a, b) => a.rating - b.rating),
      order
    );
  }

  private sortHours(order: SortOrder): ReviewSet {
    return this.order(
      [...this.reviews].sort((a, b) => a.hours - b.hours),
      order
    );
  }

  private order(reviews: BookDetails[], order: SortOrder) {
    return new ReviewSet(order === SortOrder.Ascending ? reviews.reverse() : reviews);
  }

  sort(criterium: 'date' | 'rating' | 'hours', order: SortOrder) {
    if (criterium === 'date') {
      return this.sortDate(order);
    } else if (criterium === 'rating') {
      return this.sortRating(order);
    } else if (criterium === 'hours') {
      return this.sortHours(order);
    } else {
      throwError('Invalid sort criterium provided');
    }
  }
}
