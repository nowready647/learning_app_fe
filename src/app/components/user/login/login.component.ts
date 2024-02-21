import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/environments/User';
import { LoginService } from 'src/app/services/login.service';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { HttpResponse } from '@angular/common/http';
declare var alertify:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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

  public onLogIn(): void {
      this.loginService.verifyCredentials(this.email.value, this.password.value).subscribe({
        next: (data: HttpResponse<any>) => {
          const accessToken = data.headers.get('AccessToken');
          const user: User = {
            id: data.body.data.id,
            nick: data.body.data.nick,
            email: data.body.data.email,
            accessToken: accessToken,
            password: null
          }
          this.userId = user.id;
          this.s.store('userId', user.id);
          this.s.store('accessToken', accessToken);
          this.sendToParent(user);
          alertify.success('Uživatel úspěšně přihlášen');
      },
      error: (error: any) => {
        alertify.error('CHYBA: ' + error.error.message)
      }
      });
      
  }

  private sendToParent(user: User): void {
    this.user.emit(user);
    this.display.emit(false);
  }
}
