import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-data-filter',
  templateUrl: './message-data-filter.component.html',
  styleUrls: ['./message-data-filter.component.scss']
})
export class MessageDataFilterComponent implements OnInit {

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
      solved: this.fb.control(''),
      id_creator: this.fb.control('')
    });
    this.creatorOptions = [
      {name: 'Zadejte možnost', value: null},
      {name: 'Ano', value: this.userId},
      {name: 'Ne', value: null}
    ];
    this.solvedOptions = [
      {name: 'Zadejte možnost'},
      {name: 'Ano', value: 1},
      {name: 'Ne', value: 0}
    ];
  }

  public onSubmit() {
    const values = this.filterForm.value;
    this.filters.emit(values);
    this.displayForm.emit(false);
  }

}
