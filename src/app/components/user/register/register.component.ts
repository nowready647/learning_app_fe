import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SessionStorageService } from "ngx-webstorage";
import { LoginService } from "src/app/services/login.service";
import { User } from "src/environments/User";
declare var alertify:any;

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
        private session: SessionStorageService,
        private loginService: LoginService
    ){}

    public onRegisterButtonClick() {
        this.loginService.registerUser(this.email.value, this.user.value, this.password.value).subscribe({
            next: (data) => {
                let user: User = {
                    id: data.result.id,
                    nick: data.result.nick,
                    email: data.result.email,
                    accessToken: data.result.token,
                    password: null
                  }
                this.session.store('userId', user.id);
                this.session.store('accessToken', user.accessToken);
                this.sendToParent(user);
                alertify.success('Registrace proběhla úspěšně.');
            }, 
            error: (error) => {
                console.log(error);
                alertify.error('CHYBA: ' + error.error.message)
            }
        })
    }

    public sendToParent(user: User) {
        this.display.emit(false);
        this.userEntity.emit(user);
    }
}