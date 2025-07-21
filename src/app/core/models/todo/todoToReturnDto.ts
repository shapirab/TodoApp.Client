export interface TodoToReturnDto{
  id: number,
  userId: string,
  heading: string,
  description?: string,
  isCompleted?: boolean,
  createdAt?: Date,
  completedAt?: Date
}
