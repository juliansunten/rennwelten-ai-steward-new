import {Component} from '@angular/core';
import {USER_TYPE} from "../../../../../../common/model/model";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {USER_TYPE_SELECT_OPTIONS} from "../../../const/user-type-select-options";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
    public form: FormGroup;
    public readonly userTypeSelectOptions = USER_TYPE_SELECT_OPTIONS;


    constructor(private userService: UserService) {
        this.form = new FormGroup({
            avatarUrl: new FormControl<string>('', {nonNullable: true}),
            discord: new FormControl<string>('', {nonNullable: true}),
            displayName: new FormControl<string>('', {nonNullable: true}),
            email: new FormControl<string>('', {nonNullable: true}),
            firstName: new FormControl<string>('', {nonNullable: true}),
            infoText: new FormControl<string>('', {nonNullable: true}),
            lastName: new FormControl<string>('', {nonNullable: true}),
            points: new FormControl<number>(0, {nonNullable: true}),
            userType: new FormControl<USER_TYPE[]>([], {nonNullable: true}),
        })
    }

    public handleAddUser(): Promise<void> {
        return this.userService.addUserDataIfNotExists(this.form.value);
    }
}
