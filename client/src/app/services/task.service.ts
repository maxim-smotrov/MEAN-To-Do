import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  create(task: Task): Observable<void> {
    return this.http.post<void>(this.tasksRoot, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
