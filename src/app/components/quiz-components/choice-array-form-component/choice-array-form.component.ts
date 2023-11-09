import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class ChoiceArrayFormComponent implements ControlValueAccessor {

  @Input() index: number;

  @Output() choicesEmit = new EventEmitter<Array<any>>();

  public arrayForm: FormGroup;

  public choices: Array<any> = [];

  public question_title = new FormControl();

  onChange: any = () => {}
  onTouch: any = () => {}


  constructor(private fb: FormBuilder) {
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
      is_valid: this.fb.control('')
    })
  }

  public getControls() {
    return (this.arrayForm.get('items') as FormArray).controls;
  }

  public onChoiceAdd() {
    let choice = {id: '', description: this.question_title.value, is_valid: false};
    this.choices.push(choice);
    this.addDynamicRow(choice.description);
    this.sendToParent();
    this.question_title.setValue(null);
    this.onChange(choice);
    this.onTouch(choice);
  }

  sendToParent() {
    this.choicesEmit.emit(this.choices);
  }

  public onDeleteClick(i: number): void {
    this.choices.splice(i, 1);
    this.sendToParent();
  }

  public onIsValidClick(i: number): void {
    this.choices[i].is_valid = true;
  }

  public onInvalidClick(i: number): void {
    this.choices[i].is_valid = false;
  }

  writeValue(obj: any): void {
    // this.choices.push(obj)
  }
  registerOnChange(fn: any): void {
   this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
