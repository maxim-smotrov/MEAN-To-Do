import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Output() tagSelected = new EventEmitter<string>();

  tags: string[] = [];
  selectedTag: string = null;

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getAll().subscribe(tags => this.tags = tags);
  }

  onTagSelect(tag: string): void {
    this.selectedTag = tag;
    this.tagSelected.emit(tag);
  }

  onResetClick(): void {
    this.selectedTag = null;
    this.tagSelected.emit(null);
  }
}
