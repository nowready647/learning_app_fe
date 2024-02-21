import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { QuizService } from 'src/app/services/quiz.service';
import { Choice } from 'src/environments/Choice';
import { Quiz } from 'src/environments/Quiz';
declare var alertify: any;

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
})
export class QuizSolveComponent implements OnInit, OnChanges {

  @Input() quizId: number | null;

  @ViewChild('select', { read: TemplateRef }) select: TemplateRef<any>;

  @ViewChild('text', { read: TemplateRef }) text: TemplateRef<any>;

  @ViewChild('radio', { read: TemplateRef }) radio: TemplateRef<any>;

  public quiz: Quiz;

  protected userId: number;

  protected points: number = 0;

  protected solveForm: FormGroup;

  public isSubmited: boolean = false;

  public time: number = 0;

  public timeText: string;

  public interval: any;

  public numberOfQuestions: number = 0;

  public numberOfSolvedQuestions: number = 0;
  
  public numberOfCorrectQuestions: number = 0;

  public numberOfWrongQuestions: number = 0;


  public inputTypes = [
    {name: 'text', value: 'text'},
    {name: 'radio', value: 'radio'},
    {name: 'select', value: 'select'}
  ]

  constructor(
    private sessionStorage: SessionStorageService,
    private quizService: QuizService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.time = 0;
    this.interval;
  }
  
  ngOnInit(): void {
    if(this.quizId) {
      this.quizService.find(this.quizId).subscribe(data => {
        this.quiz = data.body;
        data.body.questions.forEach((element: any) => {
          this.addQuestion(element);
          this.numberOfQuestions++;
        })
      });
    } else {
      this.route.params.subscribe(params => {
        console.log(params);
        this.quizService.find(params['id']).subscribe(data => {
          console.log(data);
          this.quiz = data.body;
          data.body.questions.forEach((element: any) => {
            this.addQuestion(element);
            this.numberOfQuestions++;
          })
        });
      });
    }
    this.solveForm = this.fb.group({
      questions: this.fb.array([])
    })

    this.userId = this.sessionStorage.retrieve('userId');

    this.interval = setInterval(() => {
      this.timeText = '';
      this.time++;
      let minutes = Math.floor(this.time / 60);

      if (minutes < 10) {
        this.timeText += '0' + minutes.toString() + ':';
      } else {
        this.timeText += minutes.toString() + ':';
      }

      if ((this.time % 60) < 10) {
        this.timeText += '0' + (this.time % 60 % 10).toString();
      } else {
        this.timeText += (this.time % 60).toString();
      }
    }, 1000)
  }

  protected addQuestion(element: any) {
    const questions = this.solveForm.get('questions') as FormArray;
    questions.push(this.fb.group({
      title: this.fb.control(''),
      question: element.question,
      description: element.description,
      type: element.input_type,
      answer: this.fb.control(''),
      checkboxes: this.fb.array([]),
      choices: this.fb.array(element.choices),
      correct: null
    }))
  }


  public getControls() {
    return (this.solveForm.get('questions') as FormArray).controls;
  }

  public onSubmit() {
    this.isSubmited = true;
    clearInterval(this.interval);
    const values = this.solveForm.value;
    this.validateQuiz(values.questions);
    if(this.userId) {
      this.quizService.solve(this.userId, this.quiz.id, this.numberOfCorrectQuestions).subscribe({
        next: (data) => {},
        error: (error) => {
          console.log(error.body);
          alertify.error(error.error.message);
        }
      });
    }
  }

  protected validateQuiz(values: any) {
    let questions = this.getControls();
    values.forEach((question: any, index: number) => {
      let correctAnswer = question.choices.filter((x: any) => x.is_correct === 1 || x.is_correct === true);
      switch(question.type) {
        case 'text':
          questions[index].value.correct = false
          correctAnswer.forEach((elem: any) => {
            if (elem.description === question.answer) {
              questions[index].value.correct = true;
              this.numberOfCorrectQuestions++;
            } else {
              this.numberOfWrongQuestions++;
            }
          })
          return;
        case 'select':
          questions[index].value.correct = false
          correctAnswer.forEach((elem: any) => {
            if (elem.id === question.answer) {
              questions[index].value.correct = true;
              this.numberOfCorrectQuestions++;
            } else {
              this.numberOfWrongQuestions++;
            }
          })
          return;
        case 'radio':
          if (correctAnswer) {
            if(!Array.isArray(correctAnswer)) {
              correctAnswer = [correctAnswer];
            }
            let idArray = this.createIdArray(correctAnswer);
            correctAnswer = idArray.filter((x: any) => !question.checkboxes.includes(x))
            if(correctAnswer.length === 0) {
              questions[index].value.correct = true
              this.numberOfCorrectQuestions++;
            } else {
              questions[index].value.correct = false
              this.numberOfWrongQuestions++;
            }
          }
          return;
      }
    })
  }

  protected createIdArray(answers: Array<Choice>) {
    let ar: Array<string> = [];
   
    answers.forEach((elem: any) => {
      ar.push(elem.id.toString());
    });
    return ar;
  }

  public setNgOutlet(type: string) {
    switch(type) {
      case 'text':
        return this.text;
      case 'select':
        return this.select;
      case 'radio':
        return this.radio;
    }
    return this.text
  }

  public prepareChoices(choices: Array<Choice>): Array<any> {
    let names: Array<any> = [];
    choices.forEach(elem => {
      names.push({label: elem.description, value: elem.id, is_correct: elem.is_correct});
    })
    return names;
  }

  public onCheckBoxClick(e: any, questionIndex: number): void {
    let questions = (this.solveForm.get('questions') as FormArray).controls[questionIndex] as FormGroup
    let selected = questions.controls['checkboxes'] as FormArray;
    if(e.target.checked) {
      selected.push(this.fb.control(e.target.value))
    } else {
      let i: number = 0;
      selected.value.forEach((item: any) => {
        if (item == e.target.value) {
          selected.controls.splice(i, 1);
          selected.setValue(selected.value.filter((x: any) => x !==  e.target.value))
          return;
        }
        i++;
      });
    }
  }

  public getCorrectAnswersString(item: any): string {
    const correctAnswers = this.prepareChoices(item.choices).filter((x: any) => x.is_correct === 1 || x.is_correct === true);
    let text = '';
    if(correctAnswers.length === 1) {
      text = correctAnswers[0].label
    } else {
      correctAnswers.forEach(elem => {
        text += elem.label + ', ';
      })
    }
    return text;
  }

  public recalculateAnsweredQuestions(): void {
    let answers = this.getControls().filter((x: any) => x.value.answer !== '' && x.value.answer !== false);
    this.numberOfSolvedQuestions = answers.length;
  }

}
