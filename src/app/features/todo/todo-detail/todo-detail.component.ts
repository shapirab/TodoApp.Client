import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TodoToReturnDto } from '../../../core/models/todo/todoToReturnDto';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../../core/services/todo.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit{
  //todo?: TodoToReturnDto;
  readonly todoInput = input<TodoToReturnDto | null>();
  todo = signal<TodoToReturnDto | null>(null);

  private activatedRoute = inject(ActivatedRoute);
  private todoService = inject(TodoService);



  ngOnInit(): void {
      this.getTodo();
  }

  getTodo(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id){
      if(this.todoInput()){
        this.todo.set(this.todoInput() ?? null);
      }
      return;
    }

    this.todoService.getTodoById(+id).subscribe({
      next: todo => {
        //this.todo = todo;
        this.todo?.set(todo);
        console.log('todoDetailComponent::getTodo(). Todo signal: ', this.todo())
      },
      error: err => console.log(err)
    });
  }

  updateTodoStatus(isCompleted: boolean){
    if(this.todo()){
      let currentTodo = this.todo();
      if(currentTodo){
        this.todoService.updateTodoCompletedStatus(isCompleted, currentTodo).subscribe({
          next: todo => this.todo?.set(todo),
          error: err => console.log(err)
        });
      }
    }
  }
}
