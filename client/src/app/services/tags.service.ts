import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagsService {
  tagsRoot: string = 'http://localhost:4141/tags';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<string[]> {
    return this.http.get<string[]>(this.tagsRoot);
  }
}
