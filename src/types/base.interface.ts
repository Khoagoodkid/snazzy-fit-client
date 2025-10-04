export type FormDataFields = Record<string, string | Blob | File | null | undefined | number | boolean | string[] | File[]>;

export interface ApiResponse<T = unknown> {
  result: boolean;
  message: string;
  status: number;
  data: T;
  options: Record<string, unknown>;
  totalPage: number;
  totalRecord: number;
}
