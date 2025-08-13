import { Component, inject, OnInit } from '@angular/core';
import { TodoToReturnDto } from '../../../core/models/todo/todoToReturnDto';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit{
  todo?: TodoToReturnDto;

  private activatedRoute = inject(ActivatedRoute);
  private todoService = inject(TodoService);



  ngOnInit(): void {
      this.getTodo();
  }

  getTodo(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id){
      return;
    }

    this.todoService.getTodoById(+id).subscribe({
      next: todo => {
        this.todo = todo;
      },
      error: err => console.log(err)
    });
  }
}
