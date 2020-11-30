import { MatPaginatorIntl } from '@angular/material/paginator';

export class PaginatorI18n {
  constructor() {}

  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Записей на странице';
    paginatorIntl.nextPageLabel = 'след.';
    paginatorIntl.previousPageLabel = 'пред.';
    paginatorIntl.firstPageLabel = 'начало';
    paginatorIntl.lastPageLabel = 'конец';
    return paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 из ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex} - ${endIndex} из ${length}`;
  }
}
