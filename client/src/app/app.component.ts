import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { TagsComponent } from './components/tags/tags.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(TagsComponent)
  private tagsComponent: TagsComponent;

  title = 'MEAN To Do';
  tasks: Task[] = [];
  editing: boolean = false;
  taskDescription: string = '';
  taskTags: string[] = [];
  taskBeingEdited: Task = null;
  selectedTag: string = null;

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    let tasksObservable: Observable<Task[]>;
    if (this.selectedTag) {
      tasksObservable = this.taskService.find({ tags: this.selectedTag });
    } else {
      tasksObservable = this.taskService.getAll();
    }
    tasksObservable.subscribe(tasks => this.tasks = tasks);
  }

  getTags(): void {
    this.tagsComponent.getTags();
  }

  onAddClick(): void {
    const task: Task = {
      description: this.taskDescription,
      tags: this.taskTags,
      completed: false
    };
    this.taskService.create(task).subscribe((createdTask) => {
      this.tasks.unshift(createdTask);
      this.taskDescription = '';
      this.taskTags = [];
      this.getTasks();
      this.getTags();
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
    this.taskTags = task.tags;
  }

  onSaveClick(): void {
    this.taskBeingEdited.description = this.taskDescription;
    this.taskBeingEdited.tags = this.taskTags;
    this.taskService.update(this.taskBeingEdited).subscribe(() => {
      this.taskDescription = '';
      this.taskTags = [];
      this.taskBeingEdited = null;
      this.editing = false;
      this.getTags();
    });
  }

  onCancelEditClick(): void {
    this.taskDescription = '';
    this.taskTags = [];
    this.taskBeingEdited = null;
    this.editing = false;
  }

  onDeleteClick(task: Task): void {
    const taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
    this.taskService.delete(task._id).subscribe(() => {
      this.getTasks();
      this.getTags();
    });
  }

  onTagSelected(tag: string): void {
    this.selectedTag = tag;
    this.getTasks();
  }
}
