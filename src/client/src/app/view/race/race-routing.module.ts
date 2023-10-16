import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RaceListComponent} from "./race-list/race-list.component";
import {RaceEditComponent} from "./race-edit/race-edit.component";
import {IncidentListComponent} from "../incident/incident-list/incident-list.component";

const routes: Routes = [
    {
        path: '',
        component: RaceListComponent,
        children: [
            {path: 'incidents', data: { breadcrumb: 'Vorfälle' }, loadChildren: () => import('../incident/incident.module').then(m => m.IncidentModule) },
        ]
    },
    {path: 'create/new', component: RaceEditComponent},
    {path: 'edit/:id', component: RaceEditComponent},
    {path: 'incident-list/:seriesId', component: IncidentListComponent},
    {
        path: ':raceSeriesId',
        component: RaceListComponent,
        children: [
            {path: 'incidents', data: { breadcrumb: 'Vorfälle' }, loadChildren: () => import('../incident/incident.module').then(m => m.IncidentModule) },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceRoutingModule { }
