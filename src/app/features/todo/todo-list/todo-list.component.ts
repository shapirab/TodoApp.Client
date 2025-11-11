import { Component, inject, OnInit } from '@angular/core';
import { TodoToReturnDto } from '../../../core/models/todo/todoToReturnDto';
import { TodoService } from '../../../core/services/todo.service';
import TodoParams from '../../../core/models/todo/todoParams';
import { TodoDetailComponent } from "../todo-detail/todo-detail.component";
import { FormsModule } from '@angular/forms';
import { TodoToAddDto } from '../../../core/models/todo/todoToAddDto';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoDetailComponent,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  private todoService = inject(TodoService);

  todos: TodoToReturnDto[] = [];
  newTodo?: string = '';

  ngOnInit(): void {
    const params: TodoParams = new TodoParams();
    this.todoService.getAllTodosAsync(params).subscribe({
      next: result => this.todos = result.todos,
      error: err => console.error(err)
    });
  }

  onSubmit(){
    console.log('todoList::OnSubmit() called.', this.newTodo)
  }
}
