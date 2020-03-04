export interface IBooksQueryParams {
  page?: number;
  limit?: number;
  title_cont?: string;
  price_from?: number;
  price_to?: number;
  date_start?: Date | string;
  date_end?: Date | string;
}
