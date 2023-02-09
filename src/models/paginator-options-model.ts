export interface PaginatorOptionsModel {
  rows: number;
  rowsPerPage: number[];
  paginatorTemplate: string;
}

export function defaultPaginatorOptions(): PaginatorOptionsModel {
  return {
    rows: 10,
    rowsPerPage: [10, 20, 50],
    paginatorTemplate:
      'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
  };
}
