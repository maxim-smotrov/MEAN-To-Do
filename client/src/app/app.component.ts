import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN To Do';
  tasks: Task[] = [];
  editing: boolean = false;
  taskDescription: string = '';
  taskBeingEdited: Task = null;

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
  }

  onAddClick(): void {
    const task: Task = { description: this.taskDescription, completed: false };
    this.taskService.create(task).subscribe((createdTask) => {
      this.tasks.unshift(createdTask);
      this.taskDescription = '';
      this.getTasks();
    });
  }

  onDoneClick(task: Task): void {
    task.completed = true;
    this.taskService.update(task).subscribe(() => this.getTasks());
  }

  onUndoClick(task: Task): void {
    task.completed = false;
    this.taskService.update(task).subscribe(() => this.getTasks());
  }

  onEditClick(task: Task): void {
    this.editing = true;
    this.taskBeingEdited = task;
    this.taskDescription = task.description;
  }

  onSaveClick(): void {
    this.taskBeingEdited.description = this.taskDescription;
    this.taskService.update(this.taskBeingEdited).subscribe(() => {
      this.taskDescription = '';
      this.taskBeingEdited = null;
      this.editing = false;
    });
  }

  onCancelEditClick(): void {
    this.taskDescription = '';
    this.taskBeingEdited = null;
    this.editing = false;
  }

  onDeleteClick(task: Task): void {
    const taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
    this.taskService.delete(task._id).subscribe(() => this.getTasks());
  }
}
