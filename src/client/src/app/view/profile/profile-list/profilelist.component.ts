import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import {IUser, USER_TYPE} from "../../../../../../common/model/model";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../../service/user.service";


@Component({
    templateUrl: './profilelist.component.html'
})
export class ProfileListComponent implements OnInit, OnDestroy {
    public users: IUser[] = [];
    private unsubSub: Subject<boolean> = new Subject<boolean>();
    public readonly userRoles = Object.keys(USER_TYPE);
    constructor(private userService: UserService, private router: Router) { }

    public ngOnInit(): void {
        this.userService.userList$
            .pipe(takeUntil(this.unsubSub))
            .subscribe(users => {
                this.users = users;
            })
    }

    public async handleUserRoleUpdate(event: any, uid: string) {
        console.log(event.checked);
        console.log(uid);
        await this.userService.updateUserRole(uid, event.checked);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreateDriver(): Promise<boolean>{
        return this.router.navigate(['dashboard', 'profile-list', 'create', 'driver'])
    }

    public handleUserEdit(user: IUser) {

    }

    public handleUserDeletion(user: IUser) {

    }

    protected readonly USER_TYPE = USER_TYPE;
}
