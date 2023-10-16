import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPenalty, IRuleList} from "../../../../../../common/model/model";
import {PenaltyService} from "../../../service/penalty.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {SUCCESS_TOAST} from "../../../const/toast";

@Component({
  templateUrl: './penalty-list.component.html',
})
export class PenaltyListComponent implements OnInit, OnDestroy {
    public penaltyList: IPenalty[] = [];
    public tableColumns = [
        {label: 'Titel', key: 'title'},
        {label: 'Infotext', key: 'infoText'},
        {label: 'Kategorie der Strafe', key: 'penaltyCategory'},
        {label: 'Münchener Punkte', key: 'points'},
        {label: '', key: ''},
    ]

    public unsubSub: Subject<boolean> = new Subject<boolean>();
    constructor(
        private toast: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private penaltyService: PenaltyService,
    ) {}

    public ngOnInit(): void {
        this.penaltyService.getPenaltyList$().pipe(
            takeUntil(this.unsubSub)
        ).subscribe((penaltyList) => this.penaltyList = penaltyList);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreatePenalty(): Promise<boolean> {
        return this.router.navigate(['dashboard', 'penalties', 'create'])
    }

    public onEditPenalty(id: string): Promise<boolean> {
        return this.router.navigate(['dashboard', 'penalties', 'edit', id]);
    }

    public onDeletePenalty(penalty: IPenalty): void {
        this.confirmationService.confirm({
            message: `Bist du sicher, dass du die Strafe ${penalty.title} löschen möchtest?`,
            accept: async () => {
                await this.penaltyService.deletePenalty(penalty.id);
                this.toast.add({...SUCCESS_TOAST, summary: `Die Strafe ${penalty.title} wurde gelöscht`})
            },
            acceptLabel: 'Ja',
            rejectLabel: 'Nein',
        });
    }
}
