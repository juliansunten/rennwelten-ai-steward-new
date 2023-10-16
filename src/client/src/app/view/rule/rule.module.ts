import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RuleRoutingModule} from './rule-routing.module';
import {RuleEditComponent} from './rule-edit/rule-edit.component';
import {RuleListComponent} from './rule-list/rule-list.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {CheckboxModule} from "primeng/checkbox";
import {PenaltyModule} from "../penalty/penalty.module";


@NgModule({
  declarations: [
    RuleEditComponent,
    RuleListComponent,
  ],
    imports: [
        CommonModule,
        RuleRoutingModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        SharedModule,
        TableModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextareaModule,
        MultiSelectModule,
        RippleModule,
        TagModule,
        CheckboxModule,
        PenaltyModule
    ]
})
export class RuleModule { }
