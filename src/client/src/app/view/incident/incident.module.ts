import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {CheckboxModule} from "primeng/checkbox";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {CdkTableModule} from "@angular/cdk/table";
import {AccordionModule} from "primeng/accordion";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {DialogModule} from "primeng/dialog";
import {SliderModule} from "primeng/slider";
import {DockModule} from "primeng/dock";

@NgModule({
    declarations: [
        IncidentListComponent
    ],
    exports: [
        IncidentListComponent
    ],
    imports: [
        CommonModule,
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
        DialogModule,
        SliderModule,
        DockModule,
    ]
})
export class IncidentModule {
}
