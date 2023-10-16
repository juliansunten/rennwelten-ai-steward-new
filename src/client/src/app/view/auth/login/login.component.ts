import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {LayoutService} from "../../../layout/app.layout.service";
import {ICredentials} from "../../../../../../common/model/model";
import {Router} from "@angular/router";


@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    public loginForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }>;

	rememberMe: boolean = false;

	constructor(
        private authService: AuthService,
        public layoutService: LayoutService,
        private router: Router,
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl<string>('js@asappz.com', {nonNullable: true}),
            password: new FormControl<string>('IGsmnmSw1!', {nonNullable: true}),
        })
    }

    public ngOnInit(): void {
        this.authService.user$.pipe().subscribe((u) => {
            if(u) {
                this.router.navigate(['dashboard']);
            }
        })
    }

    public async handleSignIn():  Promise<boolean> {
        const credentials: ICredentials = this.loginForm.value as ICredentials;
        try {
            const user  = await this.authService.signInWithEmailAndPassword(credentials);
            return this.router.navigate(['dashboard'])
        } catch (e) {
            throw new Error(JSON.stringify(e));
        }
    }


    public async handleSignInWithDiscord():  Promise<void> {
        return this.authService.signInWithDiscord()
            .then((res) => {
                console.log(res);
            });
    }

	public get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}
}
