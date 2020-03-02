import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ReviewSet } from 'src/app/models/review-set';
import { BookDetails } from 'src/app/models/book-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { SortOrder } from 'src/app/models/sort-order.enum';
import { SortCriterium } from 'src/app/models/interfaces/review-set-sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() reviews$: Observable<ReviewSet>;

  private readonly dataSubject$ = new BehaviorSubject<Array<BookDetails>>([]);
  readonly data$ = this.dataSubject$.asObservable();
  readonly displayedColumns: string[] = [
    'title',
    'author',
    'category',
    'language',
    'published',
    'finished',
    'rating',
    'words',
    'hours'
  ];

  private readonly subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.reviews$.subscribe(reviewSet => {
        this.dataSubject$.next(reviewSet.data);
      })
    );
  }

  goTo(book: BookDetails): void {
    this.router.navigate([book.url], { relativeTo: this.route });
  }

  sortReviews(sort: Sort): void {
    this.reviews$.pipe(take(1)).subscribe(reviews =>
      this.dataSubject$.next(
        reviews.sort({
          criterium: sort.active as SortCriterium,
          order: sort.direction as SortOrder
        }).data
      )
    );
  }
}
