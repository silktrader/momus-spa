import { BookDetails } from './book-details.model';
import { BookReview } from './book-review.model';

export class Book {
  constructor(public details: BookDetails, public review: BookReview) {}
}
