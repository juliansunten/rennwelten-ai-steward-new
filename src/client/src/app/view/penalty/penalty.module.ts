import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenaltyRoutingModule } from './penalty-routing.module';
import { PenaltyEditComponent } from './penalty-edit/penalty-edit.component';
import { PenaltyListComponent } from './penalty-list/penalty-list.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {TranslatePenaltyCategoryPipe} from "../../pipes/translate-penalty-category.pipe";
import {RippleModule} from "primeng/ripple";
import {TranslatePenaltyListPipe} from "../../pipes/translate-penalty-list.pipe";


@NgModule({
  declarations: [
    PenaltyEditComponent,
    PenaltyListComponent,
    TranslatePenaltyCategoryPipe,
    TranslatePenaltyListPipe,
  ],
    imports: [
        CommonModule,
        PenaltyRoutingModule,
        ButtonModule,
        InputTextModule,
        ProgressBarModule,
        SharedModule,
        TableModule,
        DropdownModule,
        ReactiveFormsModule,
        PaginatorModule,
        InputTextareaModule,
        MultiSelectModule,
        RippleModule,
    ],
    exports: [
        TranslatePenaltyCategoryPipe,
        TranslatePenaltyListPipe
    ],
})
export class PenaltyModule { }
