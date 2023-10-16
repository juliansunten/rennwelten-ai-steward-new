import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRuleList} from "../../../../../../common/model/model";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {RuleService} from "../../../service/rule.service";
import {Subject, takeUntil} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {SUCCESS_TOAST} from "../../../const/toast";

@Component({
    templateUrl: './rule-list-list.component.html',
})
export class RuleListListComponent implements OnInit, OnDestroy {
    public ruleListList: IRuleList[] = [];
    public unsubSub: Subject<boolean> = new Subject<boolean>();

    constructor(
        private toast: MessageService,
        private confirmationService: ConfirmationService,
        private ruleService: RuleService,
        private router: Router
) { }

    public ngOnInit(): void {
        this.ruleService.getRuleListList$().pipe(
            takeUntil(this.unsubSub)
        ).subscribe((ruleListList) => this.ruleListList = ruleListList);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onEditRuleList(id: string): Promise<boolean> {
        return this.router.navigate(['dashboard','rule-list', 'edit', id]);
    }

    public onDeleteRuleList(ruleList: IRuleList): void {
        this.confirmationService.confirm({
            message: `Bist du sicher, dass du das Regelwerk ${ruleList.title} löschen möchtest?`,
            accept: async () => {
                await this.ruleService.deleteRuleList(ruleList.id);
                this.toast.add({...SUCCESS_TOAST, summary: `Das Regelwerk ${ruleList.title} wurde gelöscht`})
            },
            acceptLabel: 'Ja',
            rejectLabel: 'Nein',
        });
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreateRuleList(): Promise<boolean> {
        return this.router.navigate(['dashboard/rule-list/create'])
    }
}
