import { BookDetails } from 'src/app/models/book-details.model';
import { SortOrder } from './sort-order.enum';
import { ReviewSetSort } from './interfaces/review-set-sort';

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

  // private sortPublished(order: SortOrder): ReviewSet {
  //   return this.order(
  //     [...this.reviews].sort((a, b) => a.finished.getFullYear() - b.finished.getFullYear()),
  //     order
  //   );
  // }

  private sortNumeric(prop: string, order: SortOrder): ReviewSet {
    return this.order(
      [...this.reviews].sort((a, b) => a[prop] - b[prop]),
      order
    );
  }

  private sortAlphabetic(prop: string, order: SortOrder): ReviewSet {
    return this.order(
      [...this.reviews].sort((a, b) => a[prop].localeCompare(b[prop])),
      order
    );
  }

  private order(reviews: BookDetails[], order: SortOrder) {
    return new ReviewSet(order === SortOrder.Ascending ? reviews.reverse() : reviews);
  }

  sort(sort: ReviewSetSort) {
    switch (sort.criterium) {
      case 'title':
      case 'author':
      case 'language':
      case 'category': {
        return this.sortAlphabetic(sort.criterium, sort.order);
      }

      case 'published':
      case 'started':
      case 'finished':
      case 'reviewed': {
        return this.sortNumeric(sort.criterium, sort.order);
      }
      case 'rating':
      case 'hours':
      case 'words': {
        return this.sortNumeric(sort.criterium, sort.order);
      }

      default: {
        console.log('ERROR'); // tk
        return this.sortNumeric('finished', sort.order);
      }
    }
  }
}
