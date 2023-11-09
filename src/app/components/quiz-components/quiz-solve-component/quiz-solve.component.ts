import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { Choice } from 'src/environments/Choice';
import { Question } from 'src/environments/Question';
import { Quiz } from 'src/environments/Quiz';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
})
export class QuizSolveComponent implements OnInit {

  // protected quizId: number;

  @ViewChild('select', { read: TemplateRef }) select: TemplateRef<any>;

  @ViewChild('text', { read: TemplateRef }) text: TemplateRef<any>;

  @ViewChild('radio', { read: TemplateRef }) radio: TemplateRef<any>;

  public quiz: Quiz;

  public title: string;

  public description: string;

  protected points: number = 0;

  protected solveForm: FormGroup;

  public showAnswers: boolean = false;

  public inputTypes = [
    {name: 'text', value: 'text'},
    {name: 'radio', value: 'radio'},
    {name: 'select', value: 'select'}
  ]

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.find(params['id']).subscribe(data => {
        this.quiz = data.body;
        this.title = this.quiz.title;
        this.description = this.quiz.description;
        this.quiz.questions.forEach(element => {
          this.addQuestion(element);
        })
      })
    })
    this.solveForm = this.fb.group({
      questions: this.fb.array([])
    })
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
    const values = this.solveForm.value;
    this.validateQuiz(values.questions);
  }

  protected validateQuiz(values: any) {
    let controls = this.getControls();
    values.forEach((question: any, index: number) => {
      let correctAnswer = question.choices.filter((x: any) => x.is_correct === 1);
      switch(question.type) {
        case 'text':
          controls[index].value.correct = false
          correctAnswer.forEach((elem: any) => {
            if (elem.description === question.answer) {
              controls[index].value.correct = true;
            }
          })
          return;
        case 'select':
          controls[index].value.correct = false
          correctAnswer.forEach((elem: any) => {
            if (elem.id === question.answer) {
              controls[index].value.correct = true;
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
            controls[index].value.correct = true
            } else {
              controls[index].value.correct = false
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

  public onCheckBoxClick(e: any, questionIndex: number) {
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
    const correctAnswers = this.prepareChoices(item.choices).filter((x: any) => x.is_correct === 1);
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

}
