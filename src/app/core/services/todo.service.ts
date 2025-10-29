import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pagination } from '../models/shared/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import TodoParams from '../models/todo/todoParams';
import { TodoToReturnDto } from '../models/todo/todoToReturnDto';
import { TodoToAddDto } from '../models/todo/todoToAddDto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = environment.apiUrl;

  private paginationMetadataSubject = new BehaviorSubject<Pagination>({
    totalItemCount: 0,
    pageNumber: 0,
    pageSize: 0
  });
  paginationMetadata$ = this.paginationMetadataSubject.asObservable();

  private http = inject(HttpClient);

  getAllTodosAsync(todoParams: TodoParams): Observable<{todos: TodoToReturnDto[], paginationMetadata: any}>{
    let params = new HttpParams();
    if(todoParams.userId){
      params = params.append('userId', todoParams.userId);
    }

    if(todoParams.isCompleted){
      params = params.append('isCompleted', todoParams.isCompleted);
    }

    if(todoParams.createdAt){
      params = params.append('createdAt', todoParams.createdAt.toISOString());
    }

    if(todoParams.completedAt){
      params = params.append('completedAt', todoParams.completedAt.toISOString());
    }

    if(todoParams.searchQuery){
      params = params.append('searchQuery', todoParams.searchQuery);
    }

    if(todoParams.sort){
      params = params.append('sort', todoParams.sort);
    }

    params = params.append('pageSize', todoParams.pageSize);
    params = params.append('pageNumber', todoParams.pageNumber);

    return this.http.get<TodoToReturnDto[]>(`${this.baseUrl}/todo`, {params, observe: 'response'}).pipe(
      map(response => {
        let paginationHeader = response.headers.get('X-Pagination');
        this.paginationMetadataSubject.next(JSON.parse(paginationHeader!));
        return {
          todos: response.body || [],
          paginationMetadata: JSON.parse(paginationHeader!)
        };
      })
    );
  }

  getTodoById(id: number): Observable<TodoToReturnDto>{
    return this.http.get<TodoToReturnDto>(`${this.baseUrl}/todo/${id}`);
  }

  addTodo(todo: TodoToAddDto): Observable<TodoToReturnDto>{
    return this.http.post<TodoToReturnDto>(`${this.baseUrl}/todo`, {todo}, {withCredentials: true});
  }

  deleteTodo(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/todo/${id}`);
  }

  updateTodoCompletedStatus(isCompleted: boolean, todo: TodoToReturnDto){
    let todoToUpdate: TodoToAddDto = {
      UserId: todo.userId,
      Heading: todo.heading,
      Description: todo.description,
      CreatedAt: todo.createdAt,
      IsCompleted: isCompleted
    };
    console.log('todoService::updateTodoCompletedStatus(). todoToUpdate: ', todoToUpdate)
    return this.http.put<TodoToReturnDto>(`${this.baseUrl}/todo/${todo.id}`, todoToUpdate, {withCredentials: true});
  }
}
