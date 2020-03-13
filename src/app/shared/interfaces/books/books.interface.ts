export interface IBook {
  id: number;
  description: string;
  authorId: number;
  title: string;
  price: number;
  genres: [];
  datePublishing?: object | string;
  phoneNumber?: string;
}
