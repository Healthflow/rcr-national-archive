import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
  styleUrls: ['./dicom-viewer.component.css']
})
export class DicomViewerComponent implements OnInit {

  //@Input() caseId: number;

  private el: HTMLElement;

  constructor(el: ElementRef) { 
    this.el = el.nativeElement;
  }

  ngOnInit() { 
    cornerstone.enable(this.el);
  }
}