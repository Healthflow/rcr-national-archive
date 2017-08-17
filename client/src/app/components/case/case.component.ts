import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseData } from '../../domain/case-data';
import { CaseService } from '../../services/case.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit, OnDestroy {

  caseData: CaseData;
  isCpd: boolean;

  private sub: any;

  constructor(private route: ActivatedRoute, private caseService: CaseService, private userService: UserService) { }

  ngOnInit() {

    this.sub = this.route
      .params
      .subscribe(params => {
        let caseId = +params['id'];
        this.caseData = this.caseService.getCaseData(caseId);
        this.isCpd = this.userService.isCpd(caseId);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 
}
