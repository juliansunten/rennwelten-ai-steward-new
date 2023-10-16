import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRule, IRuleList} from "../../../../../../common/model/model";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {RuleService} from "../../../service/rule.service";
import {Subject, takeUntil} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {SUCCESS_TOAST} from "../../../const/toast";

@Component({
  templateUrl: './rule-list.component.html',
})
export class RuleListComponent implements OnInit, OnDestroy {
    public ruleList: IRule[] = [];
    public unsubSub: Subject<boolean> = new Subject<boolean>();

    constructor(
        private toast: MessageService,
        private confirmationService: ConfirmationService,
        private ruleService: RuleService, private router: Router
    ) { }

    public ngOnInit(): void {
        this.ruleService.getRuleList$().pipe(
            takeUntil(this.unsubSub)
        ).subscribe((ruleList) => this.ruleList = ruleList);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onEditRule(id: string): Promise<boolean> {
        return this.router.navigate(['dashboard','rules', 'edit', id]);
    }

    public onDeleteRule(rule: IRule): void {
        this.confirmationService.confirm({
            message: `Bist du sicher, dass du die Regel ${rule.title} löschen möchtest?`,
            accept: async () => {
                await this.ruleService.deleteRule(rule.id);
                this.toast.add({...SUCCESS_TOAST, summary: `Die Regel ${rule.title} wurde gelöscht`})
            },
            acceptLabel: 'Ja',
            rejectLabel: 'Nein',
        });
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreateRule(): Promise<boolean> {
        return this.router.navigate(['dashboard','rules', 'create'])
    }
}
