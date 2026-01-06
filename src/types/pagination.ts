import { Task } from "./task";

export type PaginationParams = {
  page: number;
  limit: number;
};

export type SortParams = {
  field: keyof Task;
  direction: "asc" | "desc";
};

export type FilterParams = {
  completed?: boolean;
  search?: string;
};
