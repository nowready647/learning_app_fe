import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/environments/Message';
declare var alertify: any;
export let browserRefresh = false;

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  public messageForm: FormGroup;
  public userId: number;
  public message: Message;
  @Input() question: Message | null;
  @Output() displayForm = new EventEmitter<boolean>();
  subscription: Subscription;

  constructor(
    private sessionStorage: SessionStorageService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    this.messageForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      id_creator: this.fb.control(this.userId),
      solved: this.fb.control(false),
    });
    if(this.question) {
      this.messageForm.patchValue({ title: 'RE: ' + this.question?.title });
    }
  }

  public onSubmit(): void {
    let values = this.messageForm.value;
    if(this.question) {
      values.id_question = this.question.id;
    }
    this.messageService.add(values).subscribe({
      next: (result) => {
        this.displayForm.emit(false);
      },
      error: (error) => {
        console.log(error.error);
        if(error.error.invalidToken) {
          this.reloadCurrentRoute();
        }
      }
    })
  }

  private reloadCurrentRoute() {
    this.sessionStorage.clear('accessToken');
    this.sessionStorage.clear('userId');
    alertify.error('fsdfsfsd');
    window.location.reload();
  }
}
