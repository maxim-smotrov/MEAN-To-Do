import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Task from '../models/task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasksRoot: string = 'http://localhost:4141/tasks';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksRoot);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksRoot, task, httpOptions);
  }

  update(task: Task): Observable<void> {
    return this.http.put<void>(`${this.tasksRoot}/${task._id}`, task, httpOptions);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.tasksRoot}/${id}`);
  }
}
