import { Component, Input, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'src/environments/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(
  protected sessionStorage: SessionStorageService,
  protected userService: UserService
  ) {}

  title = 'learning_app_fe';
  @Input() displayLogIn = false;
  @Input() displayRegister = false;
  @Input() user: User | null;

  ngOnInit(): void {
    const id = this.sessionStorage.retrieve('userId');
    if(id) {
      this.userService.find(Number(id)).subscribe(data => {
        this.user = data.data;
        console.log(this.user)
      })
    }
  }

  public setDisplayLogIn(display: boolean): void {
    this.displayLogIn = display;
  }

  public setDisplayRegister(display: boolean): void {
    this.displayRegister = display;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public onLogOutUser(): void {
    this.user = null;
    this.sessionStorage.clear('userId');
  }
}
