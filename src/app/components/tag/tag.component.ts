import { TagService } from './../../services/tag.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  tags: string[];
  sub: Subscription;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.sub = this.tagService.getTags()
                   .subscribe(tags => this.tags = tags);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
