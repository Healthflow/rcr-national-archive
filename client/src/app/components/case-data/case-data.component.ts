import { Component, OnInit, Input } from '@angular/core';
import { CaseData } from '../../domain/case-data';

@Component({
  selector: 'app-case-data',
  templateUrl: './case-data.component.html',
  styleUrls: ['./case-data.component.css']
})
export class CaseDataComponent implements OnInit {

  @Input() caseData: CaseData

  constructor() { }

  ngOnInit() {
  }
}
