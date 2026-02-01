export default class TodoParams {
  pageNumber: number = 1;
  pageSize: number = 10;
  sort: string = 'name';
  searchQuery?: string;
  userEmail?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  completedAt?: Date;

}
