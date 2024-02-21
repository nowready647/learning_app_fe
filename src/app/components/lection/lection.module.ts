import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DividerModule } from "primeng/divider";
import { LectionComponent } from "./lection.component";
import { TabViewModule } from 'primeng/tabview';
import { QuizSolveModule } from "../quiz-components/quiz-solve-component/quiz-solve.module";
import { BadgeModule } from "primeng/badge";
import { MathjaxModule } from "mathjax-angular";



@NgModule({
    declarations: [
      LectionComponent
    ],
    imports: [
      MathjaxModule.forRoot(),
      // MathjaxModule.forRoot({
      //   "config": {
      //     "loader": {
      //       "load": ["output/svg", "[tex]/require", "[tex]/ams"]
      //     },
      //     "tex": {
      //       "inlineMath": [["$", "$"]],
      //       "packages": ["base", "require", "ams"]
      //     },
      //     "svg": { "fontCache": "global" }
      //   },
      //   "src": "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js"
      // }),
      BadgeModule,
      QuizSolveModule,
      TabViewModule,
      DividerModule,
      CommonModule
    ],
    providers: [],
    bootstrap: [],
    exports: [LectionComponent]
  }) 
  export class LectionModule { }