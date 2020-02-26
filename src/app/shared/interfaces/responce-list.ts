import { IBook } from './books';
import { IMeta } from './meta';
import { IAuthor } from './authors';

export interface IResponceList {
  books?: IBook[];
  authors?: IAuthor[];
  meta?: IMeta;
}
