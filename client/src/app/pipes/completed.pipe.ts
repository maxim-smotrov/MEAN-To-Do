import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({ name: 'completed' })
export class CompletedPipe implements PipeTransform {

  transform(tasks: Task[], completed: boolean): Task[] {
    return tasks.filter(t =>  t.completed !== completed);
  }
}
