import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceRoutingModule } from './race-routing.module';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceEditComponent } from './race-edit/race-edit.component';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {IncidentModule} from "../incident/incident.module";
import {AccordionModule} from "primeng/accordion";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {DockModule} from "primeng/dock";


@NgModule({
  declarations: [
    RaceListComponent,
    RaceEditComponent
  ],
    imports: [
        CommonModule,
        RaceRoutingModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule,
        RippleModule,
        IncidentModule,
        AccordionModule,
        CalendarModule,
        TableModule,
        TagModule,
        DockModule
    ]
})
export class RaceModule { }
