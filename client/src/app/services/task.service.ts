import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import Task from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasksRoot: string = 'http://localhost:4141/tasks';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksRoot);
  }
}
