import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookDto } from 'src/app/models/interfaces/book-dto';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  detailsForm = this.fb.group({
    isbn: undefined,
    author: undefined,
    title: undefined,
    url: undefined,
    language: undefined,
    published: undefined,
    words: undefined,
    cover: undefined,
    category: 'Fiction'
  });

  readingForm = this.fb.group({
    started: undefined,
    finished: undefined,
    rating: undefined,
    hours: undefined
  });

  reviewForm = this.fb.group({
    contents: undefined
  });

  private get shortUrl(): string {
    return this.route.snapshot.params.shortUrl;
  }

  tags: Array<string> = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private cachedBook: Book;

  private get editedBook(): BookDto {
    return {
      details: {
        id: this.cachedBook ? this.cachedBook.details.id : undefined,
        ...this.detailsForm.value,
        ...this.readingForm.value,
        reviewed: undefined
      },
      review: {
        ...this.reviewForm.value
      }
    };
  }

  constructor(
    private fb: FormBuilder,
    private bs: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // determine whether it's an edit or an addition
    if (this.shortUrl) {
      this.bs.getBook(this.shortUrl).subscribe(book => {
        this.cachedBook = book;
        this.resetForm();
      });
    } else {
      console.log('new entry');
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public get formsEdited() {
    if (!this.cachedBook) {
      return this.detailsForm.dirty || this.readingForm.dirty;
    }

    // check for all keys set by forms and compare them to the original book state
    for (const key in this.detailsForm.value) {
      if (this.cachedBook[key] !== this.detailsForm.value[key]) {
        return true;
      }
    }
    for (const key in this.readingForm.value) {
      if (this.cachedBook[key] !== this.readingForm.value[key]) {
        return true;
      }
    }
  }

  public resetForm() {
    if (this.cachedBook) {
      this.detailsForm.patchValue(this.cachedBook.details);
      this.readingForm.patchValue(this.cachedBook.details);
      this.reviewForm.patchValue(this.cachedBook.review);
    } else {
      this.detailsForm.reset();
      this.readingForm.reset();
      this.reviewForm.reset();
    }
  }

  public handleBook() {
    this.shortUrl ? this.updateBook() : this.createBook();
  }

  public goUpwards() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private createBook() {
    this.bs.addBook(this.editedBook).subscribe(
      (book: BookDto) => {
        console.log('added' + book);
        this.goUpwards();
      },
      error => {
        console.log(error);
      }
    );
  }

  private updateBook() {
    console.log(this.editedBook);
    this.bs.updateBook(this.editedBook).subscribe(book => {
      console.log('Updated ' + book);
      this.goUpwards();
    });
  }

  public deleteBook() {}
}
