import { SortOrder } from '../sort-order.enum';
import { SortCriterium } from '../types/sort-criterium';

export interface ReviewSetSort {
  criterium: SortCriterium;
  order: SortOrder;
}
