import { BookDetails } from './book-details.model';
import { BookReview } from './book-review.model';

export class Book {
  public readonly interval: number | null;

  constructor(public readonly details: BookDetails, public readonly review: BookReview) {
    // running these calculations in the constructor saves multiple iterations while rendering
    this.interval = this.calculateInterval();
  }

  private msInDate(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
  }

  private calculateInterval(): number | null {
    if (!this.details.started || !this.details.finished) {
      return null;
    }

    // how many milliseconds are in a day
    const msDay = 24 * 60 * 60 * 1000;

    // make sure that all dates begin at the same hour
    return Math.round(
      (this.msInDate(this.details.finished) - this.msInDate(this.details.started)) / msDay
    );
  }
}
