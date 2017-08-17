import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-collection-multiselect',
  templateUrl: './collection-multiselect.component.html',
  styleUrls: ['./collection-multiselect.component.css']
})
export class CollectionMultiselectComponent implements OnInit {

  @Input() caseId: number;

  collectionItems: SelectItem[];
  selectedCollectionIds: number[];

  constructor(private userService: UserService) { }

  ngOnInit() {

    let user = this.userService.getUser();

    this.selectedCollectionIds = [];
    this.collectionItems = [];
    for (let collection of user.collections) {
      if (collection.cases.includes(this.caseId)) this.selectedCollectionIds.push(collection.id);
      this.collectionItems.push({label: collection.name, value: collection.id});
    }
  }

  onChange(event) {
    this.userService.setCollections(this.caseId, event.value);
  }

}
