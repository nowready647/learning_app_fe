import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/environments/Message';
declare var alertify:any;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  public message: Message;
  private messageId: number;
  public userId: number | null;
  public displayForm: boolean = false;
  
  constructor (
    private sessionStorage: SessionStorageService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    this.route.params.subscribe({
      next: (params) => {
        this.messageId = params['id'];
        this.loadData();
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }

  public setDisplayForm(display: boolean) {
    this.displayForm = display;
    this.loadData();
  }

  private loadData() {
    this.messageService.find(this.messageId).subscribe({
      next: (data) => {
        this.message = <Message>data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  public solveMessage() {
    this.messageService.solve(this.message).subscribe({
      next: (data) => {
        alertify.success('Diskuze k dotazu byla uzavřena.')
        this.loadData();
      }
    })
  }
}
