import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Model} from "../../../../common/model/model";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuSource = new Subject<Model>();
    private resetSource = new Subject();
    public menuSource$ = this.menuSource.asObservable();
    public resetSource$ = this.resetSource.asObservable();

    public onMenuStateChange(event: Model) {
        this.menuSource.next(event);
    }

    public reset() {
        this.resetSource.next(true);
    }
}
