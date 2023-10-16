import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './layout/app.layout.component';
import {authGuard} from "./guard/auth.guard";
import {USER_TYPE} from "../../../common/model/model";


const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
        {path: '', data: { breadcrumb: 'Login' }, loadChildren: () => import('./view/auth/login/login.module').then(m => m.LoginModule) },
        {path: 'register', data: { breadcrumb: 'Registrieren' }, loadChildren: () => import('./view/auth/register/register.module').then(m => m.RegisterModule) },
        {path: 'dashboard',
            canActivate:[
                authGuard,
            ],
            data:{userTypes: [USER_TYPE.DRIVER, USER_TYPE.STEWARD, USER_TYPE.ADMIN]},
            component: AppLayoutComponent,
            children: [
        {path: 'profile-list', data: { breadcrumb: 'Nutzerliste' }, loadChildren: () => import('./view/profile/profile.module').then(m => m.ProfileModule) },
        {path: 'penalties', data: { breadcrumb: 'Strafen' }, loadChildren: () => import('./view/penalty/penalty.module').then(m => m.PenaltyModule) },
        {path: 'rule-list', data: { breadcrumb: 'Regelwerke' }, loadChildren: () => import('./view/rule-list/rule-list.module').then(m => m.RuleListModule) },
        {path: 'rules', data: { breadcrumb: 'Regeln' }, loadChildren: () => import('./view/rule/rule.module').then(m => m.RuleModule) },
        {path: 'verdicts', data: { breadcrumb: 'Archiv-Urteile' }, loadChildren: () => import('./view/verdict/verdict.module').then(m => m.VerdictModule) },
        {path: 'race-list', data: { breadcrumb: 'Rennserien' }, loadChildren: () => import('./view/race/race.module').then(m => m.RaceModule) },
    ]},
    { path: 'notfound', loadChildren: () => import('./view/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
