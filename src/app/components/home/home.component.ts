import { Component, OnInit } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { QuizService } from "src/app/services/quiz.service";
import { UserService } from "src/app/services/user.service";
import { Quiz } from "src/environments/Quiz";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public topQuizes: Array<Quiz> = [];
    public userId: number | null;
    public topSolvers: Array<any>

    constructor(
        private userService: UserService,
        private sessionStorage: SessionStorageService,
        private quizService: QuizService
    ) {}

    ngOnInit(): void {
        this.userId = this.sessionStorage.retrieve('userId');
        this.quizService.getPopular().subscribe({
            next: (data) => {
                this.topQuizes = data.body;
            }
        });
        this.userService.getTopSolvers().subscribe({
            next: (data) => {
                this.topSolvers = data;
            }, 
            error: (error) => {
                console.log(error);
            }
        })
    }
    
}