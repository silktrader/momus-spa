export interface BookDetailsDto {
  id: number;
  isbn: string;

  author: string;
  title: string;
  url: string;
  words: number;
  language: string;
  cover: string;
  category: 'Fiction' | 'Nonfiction' | 'Poetry' | 'Comics';

  published: string;
  started: string;
  finished: string;
  reviewed: string;

  rating: number;
  hours: number;
}
