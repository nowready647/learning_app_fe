import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DividerModule } from "primeng/divider";
import { TabViewModule } from 'primeng/tabview';
import { QuizSolveComponent } from "./quiz-solve.component";
import { BadgeModule } from "primeng/badge";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { QuizGridComponent } from "../quiz-grid-component/quiz-grid.component";

const routes: Routes = [
    {path: 'quiz-grid-component', component: QuizGridComponent},
  ];

@NgModule({
    declarations: [
      QuizSolveComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        DropdownModule,
        CardModule,
        BadgeModule,
        TabViewModule,
        DividerModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [],
    exports: [QuizSolveComponent]
  }) 
  export class QuizSolveModule { }