import { IBook } from './books';
import { IMeta } from './meta';
import { IAuthors } from './authors';

export interface IResponceList {
  books?: IBook[];
  authors?: IAuthors[];
  meta?: IMeta;
}
