import { Component, OnInit, Input } from '@angular/core';
import { CaseImageType } from '../../domain/case-image';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-images',
  templateUrl: './case-images.component.html',
  styleUrls: ['./case-images.component.css']
})
export class CaseImagesComponent implements OnInit {

  @Input() caseId: number

  imageTypes: CaseImageType[];

  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.imageTypes = this.caseService.getCaseImageTypes(this.caseId);
  }

}
