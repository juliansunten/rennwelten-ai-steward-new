import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";
import {ProfileListComponent} from "./profile-list/profilelist.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ProfileListComponent},
        {path: 'create', component: ProfileEditComponent},
        {path: 'create/driver', component: ProfileEditComponent},
        {path: 'create/admin', component: ProfileEditComponent},
        {path: 'create/steward', component: ProfileEditComponent},
        {path: 'edit/:id', component: ProfileEditComponent},
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
