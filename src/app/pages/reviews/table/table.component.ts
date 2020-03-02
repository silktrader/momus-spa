import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ReviewSet } from 'src/app/models/review-set';
import { BookDetails } from 'src/app/models/book-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { SortOrder } from 'src/app/models/sort-order.enum';
import { SortCriterium } from 'src/app/models/types/sort-criterium';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() reviews$: Observable<ReviewSet>;
  @Input() extraColumns$: Observable<ReadonlyArray<SortCriterium>>;

  private readonly dataSubject$ = new BehaviorSubject<Array<BookDetails>>([]);
  readonly data$ = this.dataSubject$.asObservable();
  readonly displayedColumns$ = new BehaviorSubject<Array<string>>([]);

  // those columns which will be displayed in every case
  private readonly baseColumns: ReadonlyArray<SortCriterium> = [
    'title',
    'author',
    'published',
    'finished',
    'hours',
    'words',
    'rating'
  ];

  // the ideal order columns should be displayed in
  private readonly idealOrder: ReadonlyArray<SortCriterium> = [
    'title',
    'author',
    'category',
    'language',
    'published',
    'started',
    'finished',
    'reviewed',
    'hours',
    'words',
    'rating'
  ];

  private readonly subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.reviews$.subscribe(reviewSet => {
        this.dataSubject$.next(reviewSet.data);
      })
    );

    // add the extra columns specified by the selector
    this.subscription.add(
      this.extraColumns$.subscribe(extras =>
        this.displayedColumns$.next(this.arrangeColumns(this.baseColumns.concat(extras)))
      )
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

  // sort columns as specified in `idealOrder` to contextualise them
  private arrangeColumns(columns: Array<SortCriterium>): Array<SortCriterium> {
    const finalColumns: Array<SortCriterium> = [];
    for (const column of this.idealOrder) {
      if (columns.includes(column)) {
        finalColumns.push(column);
      }
    }
    return finalColumns;
  }
}
