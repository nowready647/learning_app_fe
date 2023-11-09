import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { UserService } from "src/app/services/user.service";
import { User } from "src/environments/User";
import { Md5 } from 'ts-md5';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {

    public email = new FormControl();
    public password = new FormControl();
    public password_check = new FormControl();
    public user = new FormControl();
    @Output() display = new EventEmitter<boolean>();
    @Output() userEntity = new EventEmitter<User>();

    constructor(
        private loginService: LoginService
    ){}

    public onRegisterButtonClick() {
        this.loginService.registerUser(this.email.value, this.user.value, this.password.value).subscribe((data) => {
            let user: User = {
                id: data.data.id,
                nick: data.data.nick,
                email: data.data.email,
                accessToken: null,
                password: null
              }
            this.sendToParent(user);
        })
    }

    public sendToParent(user: User) {
        this.display.emit(false);
        this.userEntity.emit(user);
    }
}