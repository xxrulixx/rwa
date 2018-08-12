import {
    Answer
} from './../../../model/question';
import {
    QuestionService
} from './../../../services/question.service';
import {
    TagService
} from './../../../services/tag.service';
import {
    CategoryService
} from './../../../services/category.service';
import {
    Category
} from './../../../model/category';
import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    Subscription
} from 'rxjs';
import {
    FormGroup,
    FormArray,
    FormBuilder,
    FormControl,
    Validators
} from '@angular/forms';
import {
    Question
} from '../../../model/question';
import {
    Router
} from '@angular/router';

@Component({
    selector: 'app-question-add-update',
    templateUrl: './question-add-update.component.html',
    styleUrls: ['./question-add-update.component.scss']
})
export class QuestionAddUpdateComponent implements OnInit, OnDestroy {
    // Properties
    categories: Category[];
    sub:  Subscription;
    sub2: Subscription;

    questionForm: FormGroup;
    question: Question;

    autoTags: string[] = []; // auto computed based on match within Q/A
    tags: string[] = [];

    // sub2: Subscription;
    enteredTags: string[] = [];

    get answers(): FormArray {
        return this.questionForm.get('answers') as FormArray;
    }

    // Constructor
    constructor(private fb: FormBuilder,
        private router: Router,
        private categoryService: CategoryService,
        private tagService: TagService,
        private questionService: QuestionService
    ) {}

    createForm(question: Question) {
        const fgs: FormGroup[] = question.answers.map(answer => {
            const fg = new FormGroup({
                answerText: new FormControl(answer.answerText, Validators.required),
                correct: new FormControl(answer.correct),
            });
            return fg;
        });
        const answersFA = new FormArray(fgs);

        let fcs: FormControl[] = question.tags.map(tag => {
            const fc = new FormControl(tag);
            return fc;
        });

        if (fcs.length === 0) {
            fcs = [new FormControl('')];
        }

        const tagsFA = new FormArray(fcs);

        this.questionForm = this.fb.group({
            category: [(question.categories.length > 0 ? question.categories[0] : ''), Validators.required],
            questionText: [question.questionText, Validators.required],
            tags: '',
            tagsArray: tagsFA,
            answers: answersFA,
            //     ordered: [question.ordered],
            //     explanation: [question.explanation]
            }, {
                validator: questionFormValidator
        });
    }

    computeAutoTags() {
        const allTextValues: string[] = [this.questionForm.value.questionText];
        this.questionForm.value.answers.forEach(answer => allTextValues.push(answer.answerText));
        const wordString: string = allTextValues.join(' ');
        const matchingTags: string[] = [];
        this.tags.forEach(tag => {
            const patt = new RegExp('\\b(' + tag.replace('+', '\\+') + ')\\b', 'ig');
            if (wordString.match(patt)) {
                matchingTags.push(tag);
            }
        });
        this.autoTags = matchingTags;
    }

    addTag() {
        const tag = this.questionForm.get('tags').value;
        if (tag) {
            if (this.enteredTags.indexOf(tag) < 0) {
                this.enteredTags.push(tag);
            }
            this.questionForm.get('tags').setValue('');
        }

        this.setTagsArray();
    }

    removeEnteredTag(tag) {
        this.enteredTags = this.enteredTags.filter(t => t !== tag);
    }

    ngOnInit() {
        this.sub = this.categoryService.getCategories()
            .subscribe(categories => this.categories = categories);

        this.sub2 = this.tagService.getTags()
            .subscribe(tags => this.tags = tags);

        this.question = new Question();
        this.createForm(this.question);

        const questionControl = this.questionForm.get('questionText');
        questionControl.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());
        this.answers.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());
    }

    saveQuestion(question: Question) {
        this.questionService.saveQuestion(question).subscribe(response => {
            this.router.navigate(['/question']);
        });
    }

    onSubmit() {
        // validations
        if (this.questionForm.invalid) {
            return;
        }
        // get question object from the forms
        const question: Question = this.getQuestionFromFormValue(this.questionForm.value);
        // call saveQuestion
        this.saveQuestion(question);
    }

    getQuestionFromFormValue(formValue: any): Question {
        const question = new Question();
        question.questionText = formValue.questionText;
        question.answers = formValue.answers;
        question.categoryIds = [formValue.category];
        question.tags = [...this.autoTags, ...this.enteredTags];
        return question;
    }

    get tagsArray(): FormArray {
        return this.questionForm.get('tagsArray') as FormArray;
    }

    setTagsArray() {
        this.tagsArray.controls = [];
        [...this.autoTags, ...this.enteredTags].forEach(tag => this.tagsArray.push(new FormControl(tag)));
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }

        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}

// question-add-update.component.ts
function questionFormValidator(fg: FormGroup): {
    [key: string]: boolean
} {
    const answers: Answer[] = fg.get('answers').value;
    if (answers.filter(answer => answer.correct).length !== 1) {
        return {
            'correctAnswerCountInvalid': true
        };
    }
    const tags: string[] = fg.get('tagsArray').value;
    if (tags.length < 3) {
        return {
            'tagCountInvalid': true
        };
    }
    return null;
}

// Custom Validators
// function questionFormValidator(fg: FormGroup): {
//     [key: string]: boolean
// } {
//     const answers: Answer[] = fg.get('answers').value;
//     if (answers.filter(answer => answer.correct).length !== 1) {
//         return {
//             'correctAnswerCountInvalid': true
//         };
//     }

//     const tags: string[] = fg.get('tagsArray').value;
//     if (tags.length < 3) {
//         return {
//             'tagCountInvalid': true
//         };
//     }

//     return null;
// }
