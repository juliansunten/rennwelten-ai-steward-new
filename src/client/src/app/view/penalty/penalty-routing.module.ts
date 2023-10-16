import {PenaltyListComponent} from "./penalty-list/penalty-list.component";
import {PenaltyEditComponent} from "./penalty-edit/penalty-edit.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


const routes: Routes = [
    {path: '', component: PenaltyListComponent},
    {path: 'create', component: PenaltyEditComponent},
    {path: 'edit/:id', component: PenaltyEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltyRoutingModule { }
