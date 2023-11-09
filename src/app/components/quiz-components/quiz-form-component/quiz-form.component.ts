import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { QuizService } from 'src/app/services/quiz.service';
declare var alertify:any;

@Component({
  selector: 'app-quiz-create-component',
  templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {

  private userId: number | null;
  public rows: FormArray;
  public itemForm: FormGroup;
  // public choices: string;
  addForm: FormGroup;
  public inputTypes = [
    {name: 'Otevřená otázka', value: 'text'},
    {name: 'Výběr z možností', value: 'select'},
    {name: 'a, b, c, d', value: 'radio'}
  ]

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');

    this.addForm = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control(''),
      questions: this.fb.array([])
    });
    this.rows = this.fb.array([]);
  }

  private addDynamicRow() {
    const questions = this.addForm.get('questions') as FormArray;
    questions.push(this.createItem());
  }

  protected createItem(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: this.fb.control(''),
      type: this.fb.control(this.inputTypes, Validators.required),
      choices: this.fb.array([], Validators.required)
    })
  }

  public getControls() {
    return (this.addForm.get('questions') as FormArray).controls;
  }

  public onAddTextClick() {
    this.addDynamicRow();
  }

  public onSubmit() {
    const values = this.addForm.value;
    console.log(values);
    values.id_creator = this.userId;
    this.quizService.add(values).subscribe({
      next: (res) => {
        alertify.success('Kvíz byl úspěšně vytvořen');
        this.router.navigate(['/quiz-grid-component']);
      },
      error: (err) => {
        alertify.error('CHYBA: ' + err)
      }
    })
  }

  public onDeleteClick(index: number): void {
    let controls = this.getControls();
    controls.splice(index, 1);
  }

  public setChoices(choices: Array<any>, index: number) {
    let choice = (this.getControls()[index] as FormGroup).controls['choices'] as FormArray;
    choice.clear();
    choices.forEach((element) => {
      choice.push(this.fb.control(element));
    })
    
  }
}

