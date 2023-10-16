import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {
    APPEAL_STATUS,
    IIncident,
    INCIDENT_STATUS,
    IPenalty,
    IPhysics,
    IUser,
    PENALTY_CATEGORY,
} from "../../../../../../common/model/model";
import {IncidentService} from "../../../service/incident.service";
import {AuthService} from "../../../service/auth.service";
import {Table} from "primeng/table";
import {PenaltyService} from "../../../service/penalty.service";
import {UserService} from "../../../service/user.service";
import {ApiService} from "../../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {RaceService} from "../../../service/race.service";
import {RuleService} from "../../../service/rule.service";

interface Column {
    header: string | number;
}

@Component({
    selector: 'app-incident-list',
    templateUrl: './incident-list.component.html',
})
export class IncidentListComponent implements OnInit, OnDestroy {
    public incidentList: IIncident[] = [];
    public unsubSub: Subject<boolean> = new Subject<boolean>();
    public readonly APPEAL_STATUS = APPEAL_STATUS;
    public isModalOpen: boolean = false;
    public currentIncident: IIncident | null = null;
    public currentInvolvedCarsData: any[] = [];
    public currentInvolvedCarsPhysics: IPhysics[][] = [];
    public mock: any[] = [1];
    public physicsIndex: number = 0;
    public penalties: IPenalty[] | any = [
        {title: 'Keine', value: null}
    ];
    public cols: Column[] = [
        {header: 'Car No'},
    ];
    private readonly seriesId: string | null;

    constructor(
        private toast: MessageService,
        private confirmationService: ConfirmationService,
        private incidentService: IncidentService,
        private penaltyService: PenaltyService,
        private ruleService: RuleService,
        public authService: AuthService,
        public userService: UserService,
        public apiService: ApiService,
        public activatedRoute: ActivatedRoute,
        public raceService: RaceService,
    ) {
        this.seriesId = this.activatedRoute.snapshot.paramMap.get('seriesId');
        console.log(this.seriesId);
    }

    public onSelectPenalty(event: any, incidentId: string, carId: string): void {
        console.log('onSelectPenalty', event, carId);
        this.incidentService.updateAccident(incidentId,{incidentStatus: INCIDENT_STATUS.REVIEWED})
    }

    public ngOnInit(): void {
        this.incidentService.getAccidentList$().pipe(
            takeUntil(this.unsubSub)
        ).subscribe((accidentList) => {
            this.incidentList = accidentList;
        });

        if(this.seriesId) {
            this.raceService.getRaceSeries$(this.seriesId).pipe(
                switchMap((raceSeries) => {
                    return this.ruleService.getSingleRuleList$(raceSeries.ruleListId);
                })
            ).subscribe((ruleList) => {
                let newPenalties: any[] = [];
                ruleList.rules.forEach((rules) =>rules.eligiblePenalties.forEach(p => {
                    newPenalties.push({id: p.id, title: p.title});
                }))
                console.log(newPenalties);

                this.penalties = [...this.penalties, ...newPenalties];
            })
        }
    }

    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    public async openDetailsModal(incidentData: IIncident): Promise<void> {
        if (incidentData && incidentData.id) {
            this.currentIncident = incidentData;
            this.currentInvolvedCarsData = await this.incidentService.getInvolvedCarsData(incidentData.id)
            this.currentInvolvedCarsData.forEach((data) => {
                if (data.physics) {
                    this.currentInvolvedCarsPhysics.push(data.physics)
                    this.cols.push({header: data.CarIndex},)
                }
            })
            this.isModalOpen = true;
        }
    }


    public closeDetailsModal(): void {
        console.log("Close")
        this.currentIncident = null;
        this.currentInvolvedCarsData = [];
        this.currentInvolvedCarsPhysics = [];
        this.cols = [
            {header: 'Car No'},
        ]
        this.physicsIndex = 0;
        this.isModalOpen = false;
    }

    public assignUser(uid: string | undefined, accidentId: string): void {
        if (uid) {
            console.log("id, incident", uid, accidentId)
            let assignedUser: IUser | null = null;
            let unsub: Subject<boolean> = new Subject<boolean>();
            this.userService.getUserById$(uid).pipe(takeUntil(unsub)).subscribe((u) => {
                assignedUser = u;
                this.incidentService.updateAccident(accidentId, {
                    assignedUser,
                    incidentStatus: INCIDENT_STATUS.IN_REVIEW
                })
            })
        }
    }

    public unassignUser(uid: string | undefined, accidentId: string): void {
        if (uid) {
            console.log("id, incident", uid, accidentId)
            const assignedUser = null;
            this.incidentService.updateAccident(accidentId, {
                assignedUser,
                incidentStatus: INCIDENT_STATUS.OPEN
            })
        }
    }

    // XD LOL u can make your life easier using date-fns
    public formatTime(ms: number): string {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
        const formattedTime = [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0")
        ].join(":")
        return formattedTime;
    }

    public getReplayTime(data: IIncident): number {
        const stewardReplayTime = data.replayTimes?.find((obj) => obj.stewardId === 'adminStewardId')
        if (stewardReplayTime) {
            return stewardReplayTime.replayTimeMs
        }
        return 0;
    }

    public jumpToReview(data: IIncident): void {
        this.apiService.requestReplay(data).subscribe((e) => {
            console.log(e)
        })
    }

    public connect(): void {
        this.apiService.connect().subscribe((e) => {
            console.log(e)
        });
    }

    protected readonly INCIDENT_STATUS = INCIDENT_STATUS;
    protected readonly PENALTY_CATEGORY = PENALTY_CATEGORY;
}
