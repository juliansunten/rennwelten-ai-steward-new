import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RuleListListComponent} from "./rule-list-list/rule-list-list.component";
import {RuleListEditComponent} from "./rule-list-edit/rule-list-edit.component";

const routes: Routes = [
    {path: '', component: RuleListListComponent},
    {path: 'create', component: RuleListEditComponent},
    {path: 'edit/:id', component: RuleListEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleListRoutingModule { }
