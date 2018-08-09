import { Component, OnDestroy, OnInit } from '@angular/core';

import { Category } from './../../model/category';
import { CategoryService } from './../../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[];
  sub: Subscription;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.sub = this.categoryService.getCategories().subscribe(cats => this.categories = cats);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
