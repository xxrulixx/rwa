import { QuestionService } from './../../services/question.service';
import { Question } from './../../model/question';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions: Question[];
  sub: Subscription;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.sub = this.questionService.getQuestions().subscribe(qs => this.questions = qs);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
