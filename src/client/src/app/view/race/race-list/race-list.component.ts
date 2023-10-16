import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "primeng/table";
import {IRaceSeries} from "../../../../../../common/model/model";
import {combineLatest, map, Subject, takeUntil} from "rxjs";
import {SUCCESS_TOAST} from "../../../const/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {RaceService} from "../../../service/race.service";
import {RuleService} from "../../../service/rule.service";

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.scss']
})
export class RaceListComponent implements OnInit, OnDestroy{
    public raceSeriesList: IRaceSeries[] = [];
    public unsubSub: Subject<boolean> = new Subject<boolean>();
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private raceService: RaceService,
        private ruleService: RuleService,
        private toast: MessageService,

    ) {
        console.log(this.activatedRoute.snapshot);
    }

    public ngOnInit(): void {
        const ruleListList$ = this.ruleService.getRuleListList$();
        const raceSeriesList$ = this.raceService.getRaceSeriesList$();
        combineLatest([ruleListList$, raceSeriesList$])
        .pipe(
            takeUntil(this.unsubSub),
            map(([ruleListList, raceSeriesList]) => {
                const transformedList: IRaceSeries[] = raceSeriesList.map((rS) => {
                    const ruleListTitle: string | undefined = ruleListList?.find((r) => r.id === rS.ruleListId)?.title

                    if(ruleListTitle) {
                        return {...rS, ruleListId: ruleListTitle}
                    } else {
                        return rS;
                    }
                })
                return transformedList;
            })
        ).subscribe((raceSeriesList) => this.raceSeriesList = raceSeriesList);
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onEditRaceSeries(id: string): Promise<boolean> {
        return this.router.navigate(['dashboard','race-list', 'edit', id]);
    }

    public navigateToIncidentList(seriesId: string): Promise<boolean> {
        return this.router.navigate(['dashboard','race-list', 'incident-list', seriesId]);
    }

    public onDeleteRaceSeries(raceSeries: IRaceSeries): void {
        this.confirmationService.confirm({
            message: `Bist du sicher, dass du die Rennserie ${raceSeries.title} löschen möchtest?`,
            accept: async () => {
                await this.raceService.deleteRaceSeries(raceSeries.id);
                this.toast.add({...SUCCESS_TOAST, summary: `Die Rennserie ${raceSeries.title} wurde gelöscht`})
            },
            acceptLabel: 'Ja',
            rejectLabel: 'Nein',
        });
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public navigateToCreateRaceSeries(): Promise<boolean> {
        return this.router.navigate(['dashboard/race-list/create/new'])
    }

}
