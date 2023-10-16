import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerdictListComponent} from "./verdict-list/verdict-list.component";
import {VerdictEditComponent} from "./verdict-edit/verdict-edit.component";

const routes: Routes = [
    {path: '', component: VerdictListComponent},
    {path: 'create', component: VerdictEditComponent},
    {path: 'edit/:id', component: VerdictEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerdictRoutingModule { }
