import { BookDetailsDto } from './book-details-dto';
import { BookReviewDto } from './book-review-dto';

export interface BookDto {
  details: BookDetailsDto;
  review: BookReviewDto;
}
