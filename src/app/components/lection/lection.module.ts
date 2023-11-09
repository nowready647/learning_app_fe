import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DividerModule } from "primeng/divider";
import { LectionComponent } from "./lection.component";
import { CardModule } from "primeng/card";


@NgModule({
    declarations: [LectionComponent],
    imports: [
      CardModule,
      DividerModule,
      CommonModule
    ],
    providers: [],
    bootstrap: [],
    exports: [LectionComponent]
  }) 
  export class LectionModule { }