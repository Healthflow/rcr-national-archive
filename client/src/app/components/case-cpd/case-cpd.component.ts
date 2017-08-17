import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-case-cpd',
    templateUrl: './case-cpd.component.html',
    styleUrls: ['./case-cpd.component.css']
})
export class CaseCpdComponent implements OnInit {

    @Input() caseId: number

    points : number;
    reflections : string;

    constructor(private userService: UserService) { }

    ngOnInit() {
        let userCase = this.userService.getUserCase(this.caseId);
        this.points = userCase.cpdPoints;
        this.reflections = userCase.cpdReflections;
    }

    save() {
        this.userService.setCpdDetails(this.caseId, this.points, this.reflections);
    }
}