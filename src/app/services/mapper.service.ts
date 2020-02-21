import { Injectable } from '@angular/core';
import { BookDetails } from '../models/book-details.model';
import { BookDto } from '../models/interfaces/book-dto';
import { Book } from '../models/book';
import { BookReview } from '../models/book-review.model';
import { BookDetailsDto } from '../models/interfaces/book-details-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  constructor() {}

  mapBook(dto: BookDto): Book {
    return new Book(this.mapBookDetails(dto.details), new BookReview(dto.review.contents));
  }

  mapBookDetails(dto: BookDetailsDto): BookDetails {
    return new BookDetails({
      id: dto.id,
      isbn: dto.isbn,
      author: dto.author,
      title: dto.title,
      url: dto.url,
      words: dto.words,
      language: dto.language,
      cover: dto.cover,
      genre: dto.genre || 'Fiction', // defaults to fiction when missing
      published: new Date(dto.published),
      started: new Date(dto.started),
      finished: new Date(dto.finished),
      reviewed: new Date(dto.reviewed),
      rating: dto.rating,
      hours: dto.hours || 1
    });
  }
}
