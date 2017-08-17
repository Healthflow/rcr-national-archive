import { Injectable } from '@angular/core';
import { CaseDataList, CaseData } from '../domain/case-data';
import { CaseImageType } from '../domain/case-image';
import { CaseQuery, CaseQueryType } from '../domain/case-query';
import { User, Collection } from '../domain/user';
import { CaseFactory } from './case.factory';
import { UserService } from './user.service';

@Injectable()
export class CaseService {

  cases : CaseData[];
  caseImagesTypes : any = {};

  constructor(private caseFactory: CaseFactory, private userService: UserService) { 
    this.cases = caseFactory.createCases(500);
  }

  getCases(query: CaseQuery) : CaseDataList {

    // type
    let typedCases = this.getCasesOfType(query.type, query.identifier);

    // filter
    let filteredCases = typedCases.filter((caseData) => this.filterCase(caseData, query.globalFilter, query.filters));
    let totalRecords = filteredCases.length;

    // sort
    let sortedCases = filteredCases.sort((a, b) => this.compareCase(a, b, query.sortField, query.sortOrder));

    // page
    let begin = (query.first | 0);
    let end = begin + (query.rows | 20);
    let pagedCases = filteredCases.slice(begin, end);

    return {
      cases: pagedCases,
      totalRecords: totalRecords,
    }; 
  }

  getCaseData(id: number) : CaseData {
    return this.cases.find(function(caseData) { return caseData.id == id });
  }

  getCaseImageTypes(id: number) : CaseImageType[] {
    if (!this.caseImagesTypes[id]) {
      this.caseImagesTypes[id] = this.caseFactory.createCaseImageTypes(id);
    }
    return this.caseImagesTypes[id];
  }

  getCasesOfType(type: string, identifier: number) {

    let user = this.userService.getUser();
    if (type === "my") return this.cases.filter((caseData) => caseData.author == user.name);
    if (type === "favourite") return this.cases.filter((caseData) => user.cases.some(i => i.isFavourite && i.caseId == caseData.id));
    if (type === "cpd") return this.cases.filter((caseData) => user.cases.some(i => i.isCpd && i.caseId == caseData.id));
    if (type === "collection") {
      let collection : Collection = user.collections.find((c) => c.id == identifier);
      let collectionCases = collection ? collection.cases : [];
      return this.cases.filter((caseData) => collectionCases.includes(caseData.id));
    }

    return this.cases;
  }

  compareCase(a: CaseData, b: CaseData, sortField: string, sortOrder: number) : number {
    if (!sortField) return a.id - b.id;

    let afield = a[sortField];
    let bfield = b[sortField];
    let result = afield > bfield ? 1 : bfield > afield ? -1 : a.id - b.id;

    return result * (sortOrder | 1);
  }

  filterCase(caseData: CaseData, globalFilter: string, filters: any) : boolean {

    let globalFilterResult = true;
    if (globalFilter) {
      let searchString = `${caseData.author}|${caseData.modality}|${caseData.category}|${caseData.bodyPart}|${caseData.imageCount}|${caseData.description}`
      globalFilterResult =  searchString.search(new RegExp(globalFilter, "i")) >= 0;
    }

    let filtersResult = true;
    if (filters) {
      for (let key in filters) {
        let value = caseData[key];
        let filter = filters[key].value;
        if (Array.isArray(filter)) {
          filtersResult = filtersResult && filter.includes(value);
        }
        else if (typeof filter === "string") {
          filtersResult = filtersResult && value.search(new RegExp(filter, "i")) >= 0;
        }
        else { // it's a date
          let valueString = value.toDateString();
          let filterString = filter.toDateString();
          filtersResult = filtersResult && (valueString === filterString);
        }
      }
    }

    return globalFilterResult && filtersResult;
  }
}
