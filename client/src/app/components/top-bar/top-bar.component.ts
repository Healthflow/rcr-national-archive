import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../domain/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() onGlobalFilterChanged = new EventEmitter<string>();

  globalFilter = '';
  caseParams = { globalFilter: this.globalFilter };
  user: User;
  userItems: MenuItem[];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit() { 
    this.userItems = [
      {
        label: 'Profile',
        icon: 'fa-address-card',
      },
      {
        label: 'Log Out',
        icon: 'fa-sign-out',
        routerLink: ['/login'],
      }
    ];
  }

  onSearchKey(value: string) {
    this.globalFilter = value;
    this.caseParams.globalFilter = this.globalFilter;
    this.onGlobalFilterChanged.emit(this.globalFilter);
    this.router.navigate([
      'main/cases', 
      this.route.firstChild.snapshot.params.type || 'all',
      +this.route.firstChild.snapshot.params.identifier || 0,
      this.caseParams
    ]);
  }
}