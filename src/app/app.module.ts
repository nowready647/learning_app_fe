import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/user/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from './config/constants';
import { ApiHttpService } from './services/api-http.service';
import { Routes, RouterModule, Route, ExtraOptions } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LectionComponent } from './components/lection/lection.component';
import { CommonModule } from '@angular/common';
import { LectionModule } from './components/lection/lection.module';
import { RegisterComponent } from './components/user/register/register.component';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MathjaxModule } from 'mathjax-angular';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { QuizFormComponent } from './components/quiz-components/quiz-form-component/quiz-form.component';
import { QuizGridComponent } from './components/quiz-components/quiz-grid-component/quiz-grid.component';
import { BadgeModule } from 'primeng/badge';
import {DividerModule} from 'primeng/divider';
import { ChoiceArrayFormComponent } from './components/quiz-components/choice-array-form-component/choice-array-form.component';
import { TooltipModule } from 'primeng/tooltip';
import { QuizSolveComponent } from './components/quiz-components/quiz-solve-component/quiz-solve.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MessageGridComponent } from './components/message-components/message-grid-component/message-grid.component';
import { MessageFormComponent } from './components/message-components/message-form-component/message-form.component';
import { MessageDetailComponent } from './components/message-components/message-detail-component/message-detail.component';
import { QuizSolveModule } from "./components/quiz-components/quiz-solve-component/quiz-solve.module";
import { MessageDataFilterComponent } from './components/message-components/message-data-filter-component/message-data-filter.component';
import { QuizDataFilterComponent } from './components/quiz-components/quiz-data-filter-component/quiz-data-filter.component';
import { RippleModule } from 'primeng/ripple';


const routes: Routes = [
  {path: 'login-component', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'lection-component/:id', component: LectionComponent},
  {path: 'register-component', component: RegisterComponent},
  {path: 'quiz-form-component', component: QuizFormComponent},
  {path: 'quiz-form-component/:id', component: QuizFormComponent},
  {path: 'quiz-grid-component', component: QuizGridComponent},
  {path: 'quiz-solve-component/:id', component: QuizSolveComponent},
  {path: 'message-grid-component', component: MessageGridComponent},
  {path: 'message-detail-component/:id', component: MessageDetailComponent}
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
};

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuizGridComponent,
    QuizFormComponent,
    ChoiceArrayFormComponent,
    MessageGridComponent,
    MessageFormComponent,
    MessageDetailComponent,
    MessageDataFilterComponent,
    QuizDataFilterComponent
  ],
  imports: [
    RippleModule,
    QuizSolveModule,
    NgxWebstorageModule.forRoot(),
    CardModule,
    DropdownModule,
    TooltipModule,
    DividerModule,
    BadgeModule,
    MathjaxModule.forRoot(),
    ButtonModule,
    SidebarModule,
    CommonModule,
    LectionModule,
    RouterModule.forRoot(routes, routerOptions),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    Constants,
    ApiHttpService
    ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class AppModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
