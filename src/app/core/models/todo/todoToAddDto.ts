export interface TodoToAddDto{
  UserId: string,
  Heading: string,
  Description?: string,
  IsCompleted?: boolean,
  CreatedAt?: Date,
}
