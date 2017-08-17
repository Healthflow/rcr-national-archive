import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, DataTable, SelectItem, Message } from 'primeng/primeng';
import { CaseData } from '../../domain/case-data';
import { CaseModality, CaseCategory, CaseBodyPart } from '../../domain/case-enums';
import { CaseQuery, CaseQueryType } from '../../domain/case-query';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit, OnDestroy {

  @ViewChild('dt') dataTable: DataTable;

  type: string;
  identifier: number;
  globalFilter: string;
  dateFilter: Date;

  msgs: Message[] = [];

  cases: CaseData[];
  totalRecords: number;

  modalities: SelectItem[];
  categories: SelectItem[];
  bodyParts: SelectItem[];

  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private caseService: CaseService) { }

  ngOnInit() {

    this.modalities = [];
    for (var modality in CaseModality) {
      this.modalities.push({
        label: CaseModality[modality],
        value: modality,
      });
    }

    this.categories = [];
    for (var category in CaseCategory) {
      this.categories.push({
        label: CaseCategory[category],
        value: category,
      });
    }

    this.bodyParts = [];
    for (var bodyPart in CaseBodyPart) {
      this.bodyParts.push({
        label: CaseBodyPart[bodyPart],
        value: bodyPart,
      });
    }

    this.sub = this.route
      .params
      .subscribe(params => {
        this.type = params['type'] || 'all';
        this.identifier = +params['identifier'] || 0;
        this.globalFilter = params['globalFilter'] || '';

        this.onLazyLoad(this.dataTable.createLazyLoadMetadata());
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLazyLoad(event: LazyLoadEvent) {

    event.globalFilter = this.globalFilter;

    let query : CaseQuery = {
      type: <CaseQueryType>this.type,
      identifier: this.identifier,
      globalFilter: this.globalFilter,
      first: event.first,
      rows: event.rows,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
      filters: event.filters,
    };

    // this.msgs = [];
    // this.msgs.push({
    //   severity:'info', 
    //   summary:'Query', 
    //   detail:`${JSON.stringify(query)}`
    // });

    let result = this.caseService.getCases(query);
    this.totalRecords = result.totalRecords;
    this.cases = result.cases;
  }

  onRowSelect(event) {
    this.router.navigate(['main/case', event.data.id]);
  }

  filterDate(value: any, field: any, matchMode: any) {

    let dateValue: Date = this.isDate(value) ? value : Date.parse(value);
    if (!this.isDate(dateValue)) dateValue = undefined;

    if (dateValue !== this.dateFilter) {
      this.dateFilter = dateValue;
      this.dataTable.filter(dateValue, field, matchMode);
    }
  }

  isDate(value: any) : boolean {
    return Object.prototype.toString.call(value) === "[object Date]" && !isNaN( value.getTime());
  }
}
