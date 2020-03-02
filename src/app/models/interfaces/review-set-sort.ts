import { SortOrder } from '../sort-order.enum';

export type SortCriterium =
  | 'title'
  | 'author'
  | 'language'
  | 'category'
  | 'rating'
  | 'hours'
  | 'words'
  | 'published'
  | 'started'
  | 'finished'
  | 'reviewed';

export interface ReviewSetSort {
  criterium: SortCriterium;
  order: SortOrder;
}
