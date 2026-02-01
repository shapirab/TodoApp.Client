export interface TodoToReturnDto{
  id: number,
  userEmail: string,
  heading: string,
  description?: string,
  isCompleted?: boolean,
  createdAt?: Date,
  completedAt?: Date
}
