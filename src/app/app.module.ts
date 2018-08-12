import { QuestionAddUpdateComponent } from './components/question/question-add-update/question-add-update.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { QuestionComponent } from './components/question/question.component';
import { CategoryService } from './services/category.service';
import { QuestionService } from './services/question.service';
import { TagComponent } from './components/tag/tag.component';
import { TagService } from './services/tag.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    QuestionComponent,
    TagComponent,
    QuestionAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CategoryService, QuestionService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
