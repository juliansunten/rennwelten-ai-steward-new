// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subject, takeUntil} from "rxjs";
import {MenuItem} from "primeng/api";
import {AuthService} from "../service/auth.service";
import {USER_TYPE} from "../../../../common/model/model";
import {RaceService} from "../service/race.service";

export interface INavItem {label: string; routerLink: string[], icon: string}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, OnDestroy {
    private unsubSub: Subject<boolean> = new Subject<boolean>();
    public menu: MenuItem[] = []

    constructor(
        private authService: AuthService,
        private raceService: RaceService,
    ) {
        combineLatest([this.authService.user$, this.raceService.getRaceSeriesList$()])
        .pipe(
            takeUntil(this.unsubSub),
        ).subscribe(([user, raceSeriesList]) => {
            const raceSeriesListNavItems = raceSeriesList.map((rS) => {
                return {
                    label: `${rS.title}`,
                    icon: 'pi pi-fw pi-flag',
                    routerLink: ['race-list', rS.id],
                }
            })
            this.menu = [
                {
                    label: 'Rennen',
                    icon: 'pi pi-race',
                    items: [
                        {
                            visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                            label: 'Alle anzeigen',
                            routerLink: ['race-list'],
                            icon: 'pi pi-fw pi-list',
                        },
                            ...raceSeriesListNavItems,
                        {
                            visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                            label: 'neue Rennserie anlegen',
                            routerLink: ['race-list/create/new'],
                            icon: 'pi pi-fw pi-plus',
                        },
                    ]
                },
                {
                    label: 'Nutzer',
                    icon: 'pi pi-home',
                    items: [
                        {
                            visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                            label: 'Nutzerliste',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['profile-list'],
                        },
                    ]
                },
                {
                    label: 'Urteile',
                    icon: 'pi pi-fw pi-home',
                    items: [
                        {
                            visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                            label: 'Alle anzeigen',
                            routerLink: ['verdicts'],
                            icon: 'pi pi-fw pi-list',
                        },
                        {
                            visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.DRIVER),
                            label: 'Meine Urteile anzeigen',
                            routerLink: ['verdicts'],
                            icon: 'pi pi-fw pi-list',
                        },
                    ]
                },
                {
                    label: 'Setup',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Regelwerke',
                            icon: 'pi pi-fw pi-home',
                            items: [
                                {
                                    label: 'Alle anzeigen',
                                    routerLink: ['rule-list'],
                                    icon: 'pi pi-fw pi-list',
                                },
                                {
                                    visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                                    label: 'neues Regelwerk anlegen',
                                    routerLink: ['rule-list', 'create'],
                                    icon: 'pi pi-fw pi-plus',
                                },
                            ],
                            expanded: true,
                        },
                        {
                            label: 'Regeln',
                            icon: 'pi pi-fw pi-home',
                            items: [
                                {
                                    label: 'Alle anzeigen',
                                    routerLink: ['rules'],
                                    icon: 'pi pi-fw pi-list',
                                },
                                {
                                    visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                                    label: 'neue Regel anlegen',
                                    routerLink: ['rules', 'create'],
                                    icon: 'pi pi-fw pi-plus',
                                },
                            ],
                        },
                        {
                            label: 'Strafen',
                            icon: 'pi pi-fw pi-home',
                            items: [
                                {
                                    label: 'Alle anzeigen',
                                    routerLink: ['penalties'],
                                    icon: 'pi pi-fw pi-list',
                                },
                                {
                                    visible: user?.userType.includes(USER_TYPE.ADMIN) || user?.userType.includes(USER_TYPE.STEWARD),
                                    label: 'Neue Strafe anlegen',
                                    routerLink: ['penalties', 'create'],
                                    icon: 'pi pi-fw pi-plus',
                                },
                            ]
                        },
                    ]
                },
            ];
        });
    }

    public ngOnInit(): void {

    }
    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }
}
