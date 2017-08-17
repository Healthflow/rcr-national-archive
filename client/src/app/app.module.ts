import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { 
  MenuModule,
  DataTableModule, 
  SharedModule, 
  InputTextModule, 
  MultiSelectModule, 
  CalendarModule, 
  TabViewModule, 
  FieldsetModule, 
  AccordionModule, 
  DataListModule,
  ButtonModule,
  MessagesModule,
  ToolbarModule,
  SplitButtonModule,
  PanelModule,
  CheckboxModule,
  PasswordModule,
  ChipsModule,
  RatingModule,
  SpinnerModule,
  InputTextareaModule,
} from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CaseListComponent }   from './components/case-list/case-list.component';
import { CaseComponent } from './components/case/case.component';
import { CaseDataComponent } from './components/case-data/case-data.component';
import { CaseImagesComponent } from './components/case-images/case-images.component';
import { CaseCpdComponent } from './components/case-cpd/case-cpd.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FavouriteToggleComponent } from './components/favourite-toggle/favourite-toggle.component';
import { CpdToggleComponent } from './components/cpd-toggle/cpd-toggle.component';
import { CollectionMultiselectComponent } from './components/collection-multiselect/collection-multiselect.component';
import { DicomViewerComponent } from './components/dicom-viewer/dicom-viewer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CaseRaterComponent } from './components/case-rater/case-rater.component';

import { CaseFactory } from './services/case.factory';
import { UserService } from './services/user.service';
import { CaseService } from './services/case.service';

@NgModule({
  declarations: [
    AppComponent,
    CaseListComponent,
    PageNotFoundComponent,
    CaseComponent,
    CaseDataComponent,
    CaseImagesComponent,
    CaseCpdComponent,
    LoginComponent,
    MainComponent,
    FavouriteToggleComponent,
    CpdToggleComponent,
    CollectionMultiselectComponent,
    DicomViewerComponent,
    TopBarComponent,
    SideMenuComponent,
    CaseRaterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MenuModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    TabViewModule,
    FieldsetModule,
    AccordionModule,
    DataListModule,
    ButtonModule,
    MessagesModule,
    ToolbarModule,
    SplitButtonModule,
    PanelModule,
    CheckboxModule,
    PasswordModule,
    ChipsModule,
    RatingModule,
    SpinnerModule,
    InputTextareaModule,
  ],
  providers: [
    CaseFactory,
    UserService,
    CaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }