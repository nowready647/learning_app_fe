import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChoiceService } from 'src/app/services/choice.service';
import { Choice } from 'src/environments/Choice';
declare var alertify:any;

@Component({
  selector: 'app-choice-array-form',
  templateUrl: './choice-array-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChoiceArrayFormComponent,
      multi: true
    }
  ]
})
export class ChoiceArrayFormComponent {

  @Input() index: number;

  @Input() addForm: FormGroup;

  @Output() choicesEmit = new EventEmitter<Array<any>>();

  public arrayForm: FormGroup;

  @Input() choices: Array<any> = [];

  public choiceTitle = new FormControl();

  onChange: any = () => {}
  onTouch: any = () => {}


  constructor(
    private choiceService: ChoiceService,
    private fb: FormBuilder
    ) {
    this.arrayForm = this.fb.group({
      items: this.fb.array([])
    })
  }

  private addDynamicRow(title: string) {
    const items = this.arrayForm.get('items') as FormArray;
    items.push(this.createItem(title));
  }

  protected createItem(title: string): FormGroup {
    return this.fb.group({
      id: this.fb.control(''),
      description: this.fb.control(title),
      is_correct: this.fb.control('')
    })
  }

  public getControls() {
    return (this.arrayForm.get('items') as FormArray).controls;
  }

  public onChoiceAdd() {
    let choice = {id: null, description: this.choiceTitle.value, is_correct: this.choices.length === 0};
    this.choices.push(choice);
    this.addDynamicRow(choice.description);
    this.sendToParent();
    this.choiceTitle.setValue(null);
  }

  sendToParent() {
    this.choicesEmit.emit(this.choices);
  }

  public onDeleteClick(i: number): void {
    const choiceId = this.choices[i].id;
    if (choiceId) {
      this.deleteChoiceFromDatabase(choiceId);
    }
    this.choices.splice(i, 1);
    this.sendToParent();
  }

  private deleteChoiceFromDatabase(choiceId: number): void {
    this.choiceService.delete(choiceId).subscribe({
      next: (res) => {
        alertify.success('Možnost byla úspěšně smazána.')
      },
      error: (err) => {
        alertify.error('CHYBA: ' + err.message)
      },
      complete: () => {}
    })
  }

  public onIsValidClick(i: number): void {
    if (!(this.addForm.value.questions[this.index].input_type === 'select' && this.choices.filter(x => x.is_correct === true).length > 0)) {
      this.choices[i].is_correct = true;
    }
  }

  public onInvalidClick(i: number): void {
    this.choices[i].is_correct = false;
  }
}
