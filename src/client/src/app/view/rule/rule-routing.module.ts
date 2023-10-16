import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RuleListComponent} from "./rule-list/rule-list.component";
import {RuleEditComponent} from "./rule-edit/rule-edit.component";

const routes: Routes = [
    {path: '', component: RuleListComponent},
    {path: 'create', component: RuleEditComponent},
    {path: 'edit/:id', component: RuleEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleRoutingModule { }
