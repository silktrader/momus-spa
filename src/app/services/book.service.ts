import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookDetails } from '../models/book-details.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookDetailsDto } from '../models/interfaces/book-details-dto';
import { MapperService } from './mapper.service';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { BookDto } from '../models/interfaces/book-dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly booksUrl = `${environment.backendUrl}/books/`;
  private readonly statsUrl = `${environment.backendUrl}/stats/`;

  constructor(private readonly http: HttpClient, private readonly ms: MapperService) {}

  public getFinishedYears(): Observable<Array<number | undefined>> {
    return this.http.get<Array<number | undefined>>(this.statsUrl + 'finished-years');
  }

  public getBook(shortUrl: string): Observable<Book> {
    return this.http
      .get<BookDto>(this.booksUrl + shortUrl)
      .pipe(map(book => this.ms.mapBook(book)));
  }

  public getBooks(year: number | undefined): Observable<Array<BookDetails>> {
    const url = this.booksUrl + 'year/' + (year ? year.toString() : 'unknown');
    return this.http
      .get<Array<BookDetailsDto>>(url)
      .pipe(map(books => books.map((item, index) => this.ms.mapBookDetails(item))));
  }

  public getLatestBooks(latest: number): Observable<Array<BookDetails>> {
    let params = new HttpParams();
    params = params.append('latest', latest.toString());
    return this.http
      .get<Array<BookDetailsDto>>(this.booksUrl + 'latest', { params })
      .pipe(map(books => books.map(this.ms.mapBookDetails)));
  }

  public addBook(book: BookDto): Observable<BookDto> {
    return this.http.post<BookDto>(this.booksUrl, book);
  }

  public updateBook(book: BookDto): Observable<BookDto> {
    return this.http.put(this.booksUrl + book.details.id, book).pipe(map(() => book));
  }
}
