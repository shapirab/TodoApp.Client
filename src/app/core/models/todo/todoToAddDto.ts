export interface TodoToAddDto{
  userId: string,
  heading: string,
  description?: string,
  isCompleted?: boolean,
  createdAt?: Date,
}
