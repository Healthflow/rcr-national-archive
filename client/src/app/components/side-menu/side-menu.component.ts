import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User, Collection } from '../../domain/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  
  private caseParams = { globalFilter: '' };

  @Input()
  set globalFilter(globalFilter: string) {
    this.caseParams.globalFilter = globalFilter;
  }
 
  get globalFilter(): string { return this.caseParams.globalFilter; }

  user: User;
  menuItems: MenuItem[];

  constructor(private userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit() { 

      this.menuItems = [
      {
        label: 'User Menu',
        icon: 'fa-user',
        expanded: true,
        items: [
          {
            label: 'All Cases',
            icon: 'fa-database',
            routerLink: ['./cases', 'all', this.caseParams],
          },
          {
            label: 'My Cases',
            icon: 'fa-briefcase',
            routerLink: ['./cases', 'my', this.caseParams],
          },
          {
            label: 'Favourite Cases',
            icon: 'fa-star',
            routerLink: ['./cases', 'favourite', this.caseParams],
          },
          {
            label: 'CPD Cases',
            icon: 'fa-graduation-cap',
            routerLink: ['./cases', 'cpd', this.caseParams],
          }
        ]
      },
      {
        label: 'Collections',
        icon: 'fa-folder',
        expanded: true,
        items: this.getCollectionMenuItems()
      }
    ];
  }

  getCollectionMenuItems() : MenuItem[] {

    let menuItems : MenuItem[] = [];
    //menuItems.push({ label: "Add", icon: "fa-plus", command: (event) => {}});
    for (let collection of this.user.collections) {
      menuItems.push(this.getCollectionMenuItem(collection));
    }
    return menuItems;
  }

  getCollectionMenuItem(collection: Collection) : MenuItem {
    return { 
      label: collection.name,
      icon: 'fa-reorder',
      routerLink: ['./cases', 'collection', collection.id, this.caseParams],
    }      
  }
}