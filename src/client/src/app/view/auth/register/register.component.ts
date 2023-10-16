import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LayoutService} from "../../../layout/app.layout.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {USER_TYPE_SELECT_OPTIONS} from "../../../const/user-type-select-options";
import {USER_TYPE} from "../../../../../../common/model/model";

@Component({
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	public registerForm: FormGroup;
    public userTypeSelectOptions = USER_TYPE_SELECT_OPTIONS;


    constructor(
        public authService: AuthService,
        public layoutService: LayoutService,
        private router: Router
    ) {
        this.registerForm = new FormGroup({
            email: new FormControl<string>('', [Validators.required, Validators.email]),
            firstName: new FormControl<string>('', [Validators.required]),
            lastName: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', [Validators.required]),
            passwordRepeat: new FormControl<string>('', [Validators.required]),
            userType: new FormControl<USER_TYPE[]>([USER_TYPE.STEWARD], [Validators.required]),
            hasTermsChecked: new FormControl<boolean>(false, [Validators.required, Validators.requiredTrue]),
        })
    }

    public async handleRegisterUser(): Promise<boolean> {
        try {
            await this.authService.registerWithEmailAndPassword(this.registerForm.value)
            return this.router.navigate([''])
        } catch (e) {
            console.log(e)
            throw new Error(e as string);
        }
    }

	public get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}
