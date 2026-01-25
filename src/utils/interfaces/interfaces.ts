import { ERROR_TYPE } from '../enums/enums';

export interface IError {
  code: string;
  message: string;
  type: ERROR_TYPE;
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
