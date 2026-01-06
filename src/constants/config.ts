import { UserRole } from "../types";

export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 5,
};

// Re-export enum from types for convenience in runtime code
export const ROLES = UserRole;
