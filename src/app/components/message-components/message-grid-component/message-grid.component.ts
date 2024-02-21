import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/environments/Message';
import { Moment } from 'moment'
import * as moment from 'moment';
import { SessionStorageService } from 'ngx-webstorage';
// var moment = require('moment'); 

@Component({
  selector: 'app-qa',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.scss']
})
export class MessageGridComponent implements OnInit {

  @Input() limit: number | null;
  @Input() page: number | null = 0;
  public messages: Array<Message>
  public userId: number | null;
  public displayForm: boolean = false;
  public displayFilter: boolean = false;
  public filters: object = {};

  constructor(
    private sessionStorage: SessionStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    const filters = this.sessionStorage.retrieve('messageFilters');
    this.filters = filters ?? {};
    this.loadData();
  }

  public setDisplayForm(display: boolean) {
    this.displayForm = display;
    this.loadData();
  }

  private loadData() {
    const id = this.limit ? this.userId : null;
    console.log(this.filters);
    this.messageService.getList(this.limit, id, this.page, this.filters).subscribe({
      next: (data) => {
        this.messages = <Array<Message>>data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public onButtonClick(isNext: boolean) {
    this.page = isNext ? Number(this.page) + 1 : Number(this.page) - 1;
    this.loadData();
  }

  public setFilter(filters: object) {
    this.filters = filters;
    this.sessionStorage.store('messageFilters', filters);
    this.loadData();
  }

  public setDisplayFilter(display: boolean) {
    this.displayFilter = display;
  }

  public resetFilters() {
    this.filters = {};
    this.sessionStorage.clear('messageFilters');
    this.loadData();
  }

  public isFilterEmpty() {
    return Object.keys(this.filters).length === 0
  }
}
