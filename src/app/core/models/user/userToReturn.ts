import { TodoToReturnDto } from "../todo/todoToReturnDto";

export interface UserToReturn{
  firstName: string,
  lastName: string,
  todos: TodoToReturnDto[]
}
