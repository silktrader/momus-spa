import { BookDetails } from './book-details.model';
import { BookReview } from './book-review.model';

export class Book {
  public readonly interval: number | null;
  public readonly shortenedWords: string;

  constructor(public details: BookDetails, public review: BookReview) {
    // running these calculations in the constructor saves multiple iterations while rendering
    this.interval = this.calculateInterval();
    this.shortenedWords = this.calculateShortenedWords();
  }

  private msInDate(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
  }

  public calculateInterval(): number | null {
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

  public calculateShortenedWords(): string {
    if (!this.details.words) {
      return '?';
    }

    if (this.details.words < 1000) {
      return this.details.words.toString();
    }

    return Math.round(this.details.words / 1000) + 'k';
  }
}
