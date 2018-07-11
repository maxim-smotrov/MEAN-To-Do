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
  taskDescription: string;

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
  }

  onAddClick(): void {
    const task: Task = { description: this.taskDescription, completed: false };
    this.taskService.create(task).subscribe(() => {
      this.tasks.unshift(task);
      this.taskDescription = '';
    });
  }
}
