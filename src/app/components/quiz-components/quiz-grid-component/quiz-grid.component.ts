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
  public page: number | null = 0;
  public displayFilter: boolean = false;
  public filters: object = {};

  constructor(
    private sessionStorage: SessionStorageService,
    private quizService: QuizService
    ) {}

  ngOnInit(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    const filters = this.sessionStorage.retrieve('quizFilters');
    this.filters = filters ?? {};
    this.getQuizes();
  }

  protected getQuizes(): void {
    this.quizService.getList(this.userId, this.page, this.filters).subscribe((res) => {
      console.log(res.body);
      this.list = res.body;
    })
  }

  protected getPoints(item: Quiz) {
    return item.points !== null ? item.points.toString() + '/' + item.questionsCount?.toString() : '';
  }

  public deleteQuiz(id: number) {
    this.quizService.delete(id).subscribe({
      next: (data) => {
        alertify.success('Kvíz byl úspěšně odstraněn.');
        this.getQuizes();
      },
      error: (error) => {
        alertify.error('CHYBA: ' + error.error.message);
      }
    })
  }

  public onButtonClick(isNext: boolean) {
    this.page = isNext ? Number(this.page) + 1 : Number(this.page) - 1;
    this.getQuizes();
  }

  public setFilter(filters: object) {
    this.filters = filters;
    this.sessionStorage.store('quizFilters', filters);
    this.getQuizes();
  }

  public setDisplayFilter(display: boolean) {
    this.displayFilter = display;
  }

  public resetFilters() {
    this.filters = {};
    this.sessionStorage.clear('quizFilters');
    this.getQuizes();
  }

  public isFilterEmpty() {
    return Object.keys(this.filters).length === 0
  }
}
