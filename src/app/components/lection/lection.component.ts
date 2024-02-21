import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, Sanitizer, SimpleChanges, ViewChild } from "@angular/core";
import { LectionService } from "src/app/services/lection.service";
import { Lection } from "src/environments/Lection";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-lection',
    templateUrl: './lection.component.html'
})
export class LectionComponent implements OnInit {

    public lection: Lection;
    public quizId: number | null;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private lectionService: LectionService
    ) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.lectionService.getLection(params['id']).subscribe((data) => {
                data.contentHtml = this.sanitizer.bypassSecurityTrustHtml(data.content);
                this.lection = data;
            })
        })
    }

}