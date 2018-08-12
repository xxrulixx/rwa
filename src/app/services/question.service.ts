import {
    Category
} from './../model/category';
import {
    CategoryService
} from './category.service';
import {
    Injectable
} from '@angular/core';
import {
    Headers,
    Http
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
import '../rxjs-extensions';

import {
    Question
} from '../model/question';

@Injectable()
export class QuestionService {
    private _serviceUrl = 'http://localhost:3000/questions';

    constructor(private http: Http,
        private categoryService: CategoryService) {}

    getQuestions(): Observable < Question[] > {
        const url = this._serviceUrl;
        return Observable.forkJoin(
                this.http.get(url).map < any, Question[] > (res => res.json()),
                this.categoryService.getCategories())
            .map((combined, index) => {
                const questions: Question[] = combined[0];
                const categories: Category[] = combined[1];
                questions.forEach(q => {
                    q.categories = [];
                    q.categoryIds.forEach(id => q.categories.push(categories.find(element => element.id === id)));
                });
                return questions;
            });
    }

    saveQuestion(question: Question): Observable < Question > {
        const url = this._serviceUrl;
        return this.http.post(url, question)
                        .map(res => res.json());
    }

}
