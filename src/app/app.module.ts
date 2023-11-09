import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/user/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from './config/constants';
import { ApiHttpService } from './services/api-http.service';
import { Routes, RouterModule, Route } from '@angular/router';
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




const routes: Routes = [
  {path: 'login-component', component: LoginComponent},
  {path: 'home-component', component: HomeComponent},
  {path: 'lection-component/:id', component: LectionComponent},
  {path: 'register-component', component: RegisterComponent},
  {path: 'quiz-form-component', component: QuizFormComponent},
  {path: 'quiz-grid-component', component: QuizGridComponent},
  {path: 'quiz-solve-component/:id', component: QuizSolveComponent}
];

@NgModule({
  declarations: [
    QuizSolveComponent,
    HomeComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuizGridComponent,
    QuizFormComponent,
    ChoiceArrayFormComponent,
    QuizSolveComponent
  ],
  imports: [
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
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [Constants, ApiHttpService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class AppModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
