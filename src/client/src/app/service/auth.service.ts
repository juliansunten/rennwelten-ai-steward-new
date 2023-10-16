import {inject, Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    UserCredential
} from '@angular/fire/auth';
import {UserService} from './user.service';
import {ICredentials, IRegisterFormData, IUser} from "../../../../common/model/model";
import {Router} from "@angular/router";
import {SIGN_IN_METHOD} from "../const/auth.model";
import { connectAuthEmulator } from 'firebase/auth';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private GOOGLE_OAUTH_PROVIDER = new GoogleAuthProvider();

    private auth: Auth = inject(Auth);
    public user$: Observable<IUser | null> = of(null);


    constructor(
        private userService: UserService,
        private router: Router,
    ) {

        if (this.auth) {
            // if (environment.emulatorHost) {
            //     connectAuthEmulator(this.auth, `http://${environment.emulatorHost}:9099`);
            //   }
            this.user$ = authState(this.auth).pipe(
                switchMap((user) => {
                    if (user) {
                        return this.userService.getUserById$(user.uid);
                    } else {
                        return of(null);
                    }
                })
            );
        }
    }

    public authProviderLogin(signInMethod: SIGN_IN_METHOD): Promise<UserCredential> {
        switch (signInMethod) {
            case SIGN_IN_METHOD.GOOGLE:
                return signInWithPopup(this.auth, this.GOOGLE_OAUTH_PROVIDER);
            default:
                return signInWithPopup(this.auth, this.GOOGLE_OAUTH_PROVIDER);
        }
    }

    public async deleteUser(): Promise<void> {

    }

    public triggerPasswordResetMail = async (email: string) => {
        // return this.firebaseFunctionsService
        //     .callFbFunction(FB_FUNCTION_URLS.user.sendPasswordResetMail, {
        //         email,
        //     })
        //     .catch(console.error);
    };


    public async signInWithEmailAndPassword(credentials: ICredentials): Promise<UserCredential> {
        try {
            return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
        } catch (e) {
            console.error('Error on signInWithEmailAndPassword', e);
            throw new Error(JSON.stringify(e));
        }
    }

    public async registerWithEmailAndPassword(formData: IRegisterFormData): Promise<boolean> {
        try {
            const credentials = await createUserWithEmailAndPassword(this.auth, formData.email, formData.password);
            await this.userService.createUserWithProfileAndRoles(credentials, formData)
            return this.router.navigate(['dashboard']);
        } catch (e) {
            console.error('Error on registerWithEmailAndPassword', e);
            throw new Error(JSON.stringify(e));
        }
    }

    public async signInWithDiscord(): Promise<void> {
        const provider = new OAuthProvider('oidc.rennwelten-ai-steward');

        provider.setCustomParameters({login_hint: 'user@example.com'});
        provider.addScope('mail.read');
        provider.addScope('calendars.read');

        try {
            await signInWithRedirect(this.auth, provider);
            // const credential = await getRedirectResult(this.auth);
            // console.log(credential);
            // let oAuthCredential
            //
            // if(credential) {
            //     oAuthCredential = OAuthProvider.credentialFromResult(credential);
            // }
            //
            // if(oAuthCredential) {
            //     const accessToken = oAuthCredential.accessToken;
            //     const idToken = oAuthCredential.idToken;
            //     console.log(accessToken);
            //     console.log(idToken);
            // }

        } catch (e) {
            console.error('Error on signInWithEmailAndPassword', e);
        }
    }

    public async signOut(): Promise<boolean> {
        await this.auth.signOut();
        return this.router.navigate(['login'])
    }
}

