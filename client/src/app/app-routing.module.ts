import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { LoginComponent }         from './components/login/login.component';
import { MainComponent }         from './components/main/main.component';
import { CaseListComponent }      from './components/case-list/case-list.component';
import { CaseComponent }          from './components/case/case.component';
import { PageNotFoundComponent }  from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'main', component: MainComponent,
    children: [
      { path: '', redirectTo: 'cases', pathMatch: 'full' },
      { path: 'cases', component: CaseListComponent  },
      { path: 'cases/:type', component: CaseListComponent },
      { path: 'cases/:type/:identifier', component: CaseListComponent },
      { path: 'case/:id', component: CaseComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}