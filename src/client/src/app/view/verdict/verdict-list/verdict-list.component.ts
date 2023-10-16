import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {IVerdict} from "../../../../../../common/model/model";
import {VerdictService} from "../../../service/verdict.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-verdict-list',
  templateUrl: './verdict-list.component.html',
  styleUrls: ['./verdict-list.component.scss']
})
export class VerdictListComponent implements OnInit, OnDestroy{
    public verdictList: IVerdict[] = [];
    public unsubSub: Subject<boolean> = new Subject<boolean>();

    constructor(private verdictService: VerdictService, private router: Router) { }

    public ngOnInit(): void {
        this.verdictService.getVerdictList$().pipe(
            takeUntil(this.unsubSub)
        ).subscribe((verdictList) => this.verdictList = verdictList);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreateVerdict(): Promise<boolean> {
        return this.router.navigate(['verdicts/create'])
    }
}
