import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favourite-toggle',
  templateUrl: './favourite-toggle.component.html',
  styleUrls: ['./favourite-toggle.component.css']
})
export class FavouriteToggleComponent implements OnInit {

  @Input() caseId: number;

  private el: HTMLElement;
  private isMouseOver: boolean = false;
  private isFavourite: boolean = false;

  constructor(el: ElementRef, private userService: UserService) { 
    this.el = el.nativeElement;
  }

  ngOnInit() { 
    this.isFavourite = this.userService.isFavourite(this.caseId);
    this.setColor();
  }

  onClick() {
    if (this.userService.setFavourite(this.caseId, !this.isFavourite)) {
      this.isFavourite = !this.isFavourite;
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
    return this.isFavourite ? "#e3cf7a" : "#d5d5d5";
  }

  getMouseoverColor() {
    return this.isFavourite ? "#d5d5d5" : "#e3cf7a";
  }
}
