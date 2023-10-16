import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RuleListRoutingModule} from './rule-list-routing.module';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {RuleListListComponent} from './rule-list-list/rule-list-list.component';
import {RuleListEditComponent} from "./rule-list-edit/rule-list-edit.component";
import {CheckboxModule} from "primeng/checkbox";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {CdkTableModule} from "@angular/cdk/table";
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [
    RuleListListComponent,
    RuleListEditComponent,
  ],
    imports: [
        CommonModule,
        RuleListRoutingModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        SharedModule,
        TableModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextareaModule,
        MultiSelectModule,
        CheckboxModule,
        MessagesModule,
        RippleModule,
        TagModule,
        FormsModule,
        CdkTableModule,
        AccordionModule,
    ]
})
export class RuleListModule { }
