import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { Quiz } from 'src/environments/Quiz';
declare var alertify: any;

@Component({
  selector: 'app-quiz-grid',
  templateUrl: './quiz-grid.component.html',
})
export class QuizGridComponent implements OnInit {

  protected list: Array<Quiz>;
  protected userId: number | null;

  constructor(
    private sessionStorage: SessionStorageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private quizService: QuizService
    ) {}

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    this.getQuizes();
  }

  protected getQuizes(): void {
    this.quizService.getList().subscribe((res) => {
      this.list = res.body;
    })
  }

  public deleteQuiz(id: number) {
    this.quizService.delete(id).subscribe(
      next => {
        this.getQuizes();
        alertify.success('Kvíz byl úspěšně odstraněn.');
      },
      error => {
        alertify.error('CHYBA: ' + error.message);
      }
    )
  }
}
