import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/environments/User';
import { LoginService } from 'src/app/services/login.service';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl()
  password = new FormControl()
  error = ''
  success = ''
  @Output() user = new EventEmitter<User>();
  @Output() display = new EventEmitter<boolean>();

  @SessionStorage()
  public userId: number | null;

  constructor(
    protected s: SessionStorageService,
    protected loginService: LoginService, 
    protected userService: UserService, 
    ) {}

  ngOnInit(): void {
  } 

  public onLogIn(): void {
      this.loginService.verifyCredentials(this.email.value, this.password.value).subscribe(
        (data) => {
          let user: User = {
            id: data.data.id,
            nick: data.data.nick,
            email: data.data.email,
            accessToken: data.data.accessToken,
            password: null
          }
          this.userId = user.id;
          this.s.store('userId', user.id)
          this.sendToParent(user);
      },
      error => {
        console.log(error.error.message);
      }
      
    );
      
  }

  private sendToParent(user: User): void {
    this.user.emit(user);
    this.display.emit(false);
  }
}
