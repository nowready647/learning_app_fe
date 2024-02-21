import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Choice } from 'src/environments/Choice';
import { Question } from 'src/environments/Question';
import { Quiz } from 'src/environments/Quiz';
declare var alertify:any;

@Component({
  selector: 'app-quiz-create-component',
  templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {

  private userId: number | null;

  private id: number | null;

  public addForm: FormGroup;

  public choices: Array<any>;
  

  public title: string;

  public quiz: Quiz;

  public inputTypes = [
    {name: 'Otevřená otázka', value: 'text'},
    {name: 'Výběr z možností (Jedna správná odpověď)', value: 'select'},
    {name: 'Výběr z možností (Více správných odpovědí)', value: 'radio'}
  ]

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {

    this.userId = this.sessionStorage.retrieve('userId');

    this.addForm = this.fb.group({
      id: null,
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      questions: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) {
        this.quizService.find(this.id).subscribe(data => {
          this.setDefaults(data.body);
          this.title = 'Úprava kvízu ';
          this.quiz = data.body;
        })
      } else {
        this.title = 'Nový kvíz';
      }
    })
  }

  public addDynamicRow() {
    const questions = this.addForm.get('questions') as FormArray;
    questions.push(this.createItem());
  }

  protected createItem(): FormGroup {
    return this.fb.group({
      id: null,
      question: ['', Validators.required],
      description: this.fb.control(''),
      input_type: this.fb.control('text', Validators.required),
      choices: this.fb.array([], Validators.required)
    })
  }

  public getControls() {
    return (this.addForm.get('questions') as FormArray).controls;
  }

  public onSubmit() {
    const values = this.addForm.value;
    values.id_creator = this.userId;
    if (!this.validateChoices()) {
      alertify.error('Je potřeba mít u každé otázky alespoň jednu správnou možnost.')
      return;
    }
    if (this.id) {
      this.editQuiz(values);
    } else {
      this.createQuiz(values);
    }
  }

  private validateChoices(): boolean {
    const questions = this.addForm.value.questions;
    const length = questions.length;
    const filter = questions.filter((x: any) => {
      return x.choices.filter((y: Choice) => y.is_correct === 1 || y.is_correct === true).length !== 0;
    });
    return length === filter.length;
  }

  private editQuiz(values: any): void {
    this.quizService.edit(values).subscribe({
      next: (res) => {
        alertify.success('Kvíz byl úspěšně upraven');
        this.router.navigate(['/quiz-grid-component']);
      },
      error: (err) => {
        alertify.error('CHYBA: ' + err);
      }
    });
  }

  private createQuiz(values: any): void {
    this.quizService.add(values).subscribe({
      next: (res) => {
        alertify.success('Kvíz byl úspěšně vytvořen');
        this.router.navigate(['/quiz-grid-component']);
      },
      error: (err) => {
        alertify.error('CHYBA: ' + err);
      }
    })
  }

  public onDeleteClick(index: number): void {
    let controls = this.getControls();
    const questionId = controls[index].value.id;
    if(questionId) {
      this.deleteQuestion(questionId);
    }
    controls.splice(index, 1);
  }

  private deleteQuestion(questionId: number): void {
    this.questionService.delete(questionId).subscribe({
      next: (res) => {
        alertify.success('Otázka byla úspěšně smazána.');
      },
      error: (err) => {
        alertify.error('CHYBA: ' + err.message);
      },
      complete: () => console.info('complete') 
    });
  }

  public setChoices(choices: Array<any>, index: number) {
    let choice = (this.getControls()[index] as FormGroup).controls['choices'] as FormArray;
    choice.clear();
    choices.forEach((element) => {
      choice.push(this.fb.control(element));
    })
    
  }

  protected setDefaults(data: any) {
    let form = this.addForm;
    let questions = this.addForm.get('questions') as FormArray;
    let questionsData = data.questions.filter((x: Question) => x.inactive === null)
    this.createFormControls(questions, questionsData)
    form.patchValue(data);
    questions.patchValue(data.questions);
  }

  private createFormControls(questions: FormArray, questionsData: any): void {
    for (let i = 0; i < questionsData.length; i++) {
      questions.push(this.createItem());
      let choicesControl = questions.controls[i].get('choices') as FormArray;
      const activeChoices = questionsData[i].choices.filter((x: Choice) => x.inactive === null);
      for (let y = 0; y < activeChoices.length; y++) {
        const choice = questionsData[i].choices.filter((x: Choice) => x.inactive === null)[y];
        choicesControl.push(this.fb.group({
          id: choice.id,
          description: choice.description,
          is_correct: choice.is_correct
        }));
      }
    }
  }
}

