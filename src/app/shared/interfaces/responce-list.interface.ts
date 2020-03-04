import { IBook } from './books/books.interface';
import { IMeta } from './meta.interface';
import { IAuthor } from './authors.interface';

export interface IResponceList {
  books?: IBook[];
  authors?: IAuthor[];
  meta?: IMeta;
}
