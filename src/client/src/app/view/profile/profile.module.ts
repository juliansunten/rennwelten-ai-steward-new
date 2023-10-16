import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileListComponent} from "./profile-list/profilelist.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        TableModule,
        ButtonModule,
        ChipsModule,
        InputNumberModule,
        InputTextareaModule,
        MultiSelectModule,
        ReactiveFormsModule,
        RippleModule,
        DropdownModule,
        FormsModule,
        CheckboxModule
    ],
    declarations: [
        ProfileListComponent,
        ProfileEditComponent
    ]
})
export class ProfileModule { }
