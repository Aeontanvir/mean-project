export interface ResponseList {
  statusCode: number;
  message: string;
  data: any[];
  total: number;
  offset: number;
  limit: number;
}
