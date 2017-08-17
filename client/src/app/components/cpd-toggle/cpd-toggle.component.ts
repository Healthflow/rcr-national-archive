import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cpd-toggle',
  templateUrl: './cpd-toggle.component.html',
  styleUrls: ['./cpd-toggle.component.css']
})
export class CpdToggleComponent implements OnInit {

  @Input() caseId: number;

  private el: HTMLElement;
  private isMouseOver: boolean = false;
  private isCpd: boolean = false;

  constructor(el: ElementRef, private userService: UserService) { 
    this.el = el.nativeElement;
  }

  ngOnInit() { 
    this.isCpd = this.userService.isCpd(this.caseId);
    this.setColor();
  }

  onClick() {
    if (this.userService.setCpd(this.caseId, !this.isCpd)) {
      this.isCpd = !this.isCpd;
      this.setColor();
    }
  }

  onMouseEnter() {
    this.isMouseOver = true;
    this.setColor();
  }

  onMouseLeave() {
    this.isMouseOver = false;
    this.setColor();
  }

  setColor() {
    this.el.style.color = this.isMouseOver ? this.getMouseoverColor() : this.getNormalColor();
  }

  getNormalColor() {
    return this.isCpd ? "#80378d" : "#d5d5d5";
  }

  getMouseoverColor() {
    return this.isCpd ? "#d5d5d5" : "#80378d";
  }
}
