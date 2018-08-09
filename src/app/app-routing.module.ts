import { QuestionComponent } from './components/question/question.component';
import { TagComponent } from './components/tag/tag.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'tag',
    component: TagComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
