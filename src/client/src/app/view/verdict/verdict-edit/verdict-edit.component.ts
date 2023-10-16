import { Component } from '@angular/core';
import {IDriver, IPenalty, IRace, IRaceSeries, IRule} from "../../../../../../common/model/model";
import {FormControl, FormGroup} from "@angular/forms";
import {DriverService} from "../../../service/driver.service";
import {Subject, takeUntil} from "rxjs";
import {PenaltyService} from "../../../service/penalty.service";
import {RuleService} from "../../../service/rule.service";
import {RaceService} from "../../../service/race.service";

@Component({
  selector: 'app-verdict-edit',
  templateUrl: './verdict-edit.component.html',
  styleUrls: ['./verdict-edit.component.scss']
})
export class VerdictEditComponent {
    public driverList: IDriver[] = [];
    public ruleList: IRule[] = [];
    public penaltyList: IPenalty[] = [];
    public raceList: IRaceSeries[] = [];
    public unsub: Subject<boolean> = new Subject<boolean>();
    public form: FormGroup<{
        race: FormControl<IRace | null>,
        penalties: FormControl<IPenalty[]>,
        accused: FormControl<IDriver[]>,
        damaged: FormControl<IDriver[]>,
        brokenRules: FormControl<IRule[]>,
    }>;

    constructor(
        private driverService: DriverService,
        private penaltyService: PenaltyService,
        private ruleService: RuleService,
        private raceService: RaceService,
    ) {
        this.driverService.getDriverList$().pipe(
         takeUntil(this.unsub)
        ).subscribe((driverList) => {
            this.driverList = driverList;
        })

        this.raceService.getRaceSeriesList$().pipe(
         takeUntil(this.unsub)
        ).subscribe((raceList) => {
            this.raceList = raceList;
        })

        this.penaltyService.getPenaltyList$().pipe(
            takeUntil(this.unsub)
        ).subscribe((penaltyList) => {
            this.penaltyList = penaltyList;
        })

        this.ruleService.getRuleList$().pipe(
            takeUntil(this.unsub)
        ).subscribe((ruleList) => {
            this.ruleList = ruleList;
        })


        this.form = new FormGroup({
            race: new FormControl<IRace | null>(null),
            penalties: new FormControl<IPenalty[]>([], {nonNullable: true}),
            accused: new FormControl<IDriver[]>([], {nonNullable: true}),
            damaged: new FormControl<IDriver[]>([], {nonNullable: true}),
            brokenRules: new FormControl<IRule[]>([], {nonNullable: true}),
        })
    }
}
