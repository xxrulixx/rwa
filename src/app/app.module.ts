import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { QuestionComponent } from './components/question/question.component';
import { CategoryService } from './services/category.service';
import { QuestionService } from './services/question.service';
import { TagComponent } from './components/tag/tag.component';
import { TagService } from './services/tag.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    QuestionComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CategoryService, QuestionService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
