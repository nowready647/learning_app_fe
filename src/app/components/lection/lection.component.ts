import { Component, OnInit } from "@angular/core";
import { LectionService } from "src/app/services/lection.service";
import { Lection } from "src/environments/Lection";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-lection',
    templateUrl: './lection.component.html'
})
export class LectionComponent implements OnInit {

    public lection: Lection;

    constructor(
        private route: ActivatedRoute,
        private lectionService: LectionService
    ) {

    }
    
    ngOnInit(): void {
        this.route.params.subscribe((params) =>{
            this.lectionService.getLection(params['id']).subscribe((data) => {
                this.lection = data;
            })
        })
    }

}