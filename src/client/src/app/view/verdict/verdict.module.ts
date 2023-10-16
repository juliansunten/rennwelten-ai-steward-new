import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerdictRoutingModule } from './verdict-routing.module';
import {VerdictListComponent} from "./verdict-list/verdict-list.component";
import {VerdictEditComponent} from "./verdict-edit/verdict-edit.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      VerdictListComponent,
      VerdictEditComponent
  ],
    imports: [
        CommonModule,
        VerdictRoutingModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        SharedModule,
        TableModule,
        InputNumberModule,
        InputTextareaModule,
        MultiSelectModule,
        ReactiveFormsModule
    ]
})
export class VerdictModule { }
