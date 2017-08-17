import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'app-case-rater',
    templateUrl: './case-rater.component.html',
    styleUrls: ['./case-rater.component.css']
})
export class CaseRaterComponent implements OnInit {

    @Input() caseId: number;

    rating: number;

    constructor(private userService: UserService) { }

    ngOnInit() {
        let userCase = this.userService.getUserCase(this.caseId);
        this.rating = userCase.rating;
    }

    handleRate(event) {
        this.userService.setRating(this.caseId, event.value);
    }

    handleCancel(event) {
        this.userService.setRating(this.caseId, undefined);
    }  

}