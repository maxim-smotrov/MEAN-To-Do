import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import Task from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN To Do';
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
  }
}
