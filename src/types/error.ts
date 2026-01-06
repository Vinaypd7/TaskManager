export interface AppError {
  id: string;
  message: string;
  timestamp: Date;
  userId: string;
  statusCode: number;
  route: string;
}
