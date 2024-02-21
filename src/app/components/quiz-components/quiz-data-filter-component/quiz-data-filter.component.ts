import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-data-filter',
  templateUrl: './quiz-data-filter.component.html',
  styleUrls: ['./quiz-data-filter.component.scss']
})
export class QuizDataFilterComponent implements OnInit {

  @Input() userId: number | null;
  @Output() filters = new EventEmitter<object>;
  @Output() displayForm = new EventEmitter<boolean>;
  public filterForm: FormGroup;
  public solvedOptions: Array<any>;
  public creatorOptions: Array<any>;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      title: this.fb.control(''),
      creator: this.fb.control('')
    });
  }

  public onSubmit() {
    const values = this.filterForm.value;
    this.filters.emit(values);
    this.displayForm.emit(false);
  }

}
