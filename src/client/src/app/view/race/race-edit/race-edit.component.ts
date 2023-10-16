import {Component} from '@angular/core';
import {map, Observable, of, Subject, take, takeUntil} from "rxjs";
import {IRaceSeries} from "../../../../../../common/model/model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DANGER_TOAST, SUCCESS_TOAST} from "../../../const/toast";
import {RuleService} from "../../../service/rule.service";
import {RaceService} from "../../../service/race.service";
import {TrackService} from "../../../service/track.service";

@Component({
  selector: 'app-race-edit',
  templateUrl: './race-edit.component.html',
  styleUrls: ['./race-edit.component.scss']
})
export class RaceEditComponent {
    private raceId: string | null = null;
    private unsubSub: Subject<boolean> = new Subject();
    public ruleListListSelectOptions$: Observable<any[]> | null = of([]);
    public form: FormGroup;
    public trackList: string[];
    public activeIndex: number = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toast: MessageService,
        private router: Router,
        private ruleService: RuleService,
        private raceService: RaceService,
        private trackService: TrackService,
    ){
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.raceId = this.activatedRoute.snapshot.paramMap.get('id');
        }

        this.form = new FormGroup({
            title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            raceSimulation: new FormControl<string>({disabled: true, value: 'ACC'}, {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            ruleListId: new FormControl<string>('', {nonNullable: true}),
            races: new FormArray<FormGroup>([]),
        })

        this.trackList = this.trackService.getTracksBySimulation();
        this.populateForm();
    }


    private populateForm(): void {
        if(this.raceId) {
            this.raceService.getRaceSeries$(this.raceId).pipe(take(1)).subscribe((raceSeries) => {
                this.form.patchValue(raceSeries);

                raceSeries.races.forEach((race, i) => {
                    this.addRace();
                    console.log(race);
                    this.racesFormArray.controls[i].patchValue({
                        trackName: race.trackName,
                        trainingDateTime: (race.trainingDateTime as unknown as any).toDate(),
                        qualifyingDateTime: (race.qualifyingDateTime as unknown as any).toDate(),
                        mainEventDateTime: (race.mainEventDateTime as unknown as any).toDate(),
                    })
                })
            })
        }
    }

    public get racesFormArray(): FormArray {
        return this.form.get("races") as FormArray;
    }

    public createNewRaceForm(): FormGroup {
        return new FormGroup({
            trackName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
            trainingDateTime: new FormControl(null, {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            qualifyingDateTime: new FormControl(null, {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            mainEventDateTime: new FormControl(null, {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
        })
    }

    public addRace() {
        this.racesFormArray.push(this.createNewRaceForm());
        this.activeIndex = this.racesFormArray.length - 1;
    }

    public ngOnInit(): void {
        this.ruleListListSelectOptions$ = this.ruleService.getRuleListList$()
            .pipe(
                takeUntil(this.unsubSub),
                map(ruleListList => {
                return ruleListList.map((ruleList) => {
                    return {label: ruleList.title, value: ruleList.id}
                });
            }));
    }
    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public async onSubmitRaceSeries(): Promise<void> {
        if (this.raceId){
            //@ts-ignore
            const raceSeries: IRaceSeries = {
                ...this.form.value,
                id: this.raceId,
                updatedAt: new Date().getTime(),
            }

            try {
                await this.raceService.updateRaceSeries(raceSeries);
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Rennserie wurde aktualisiert'})
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        } else {
            //@ts-ignore
            const raceSeries: Omit<IRaceSeries, 'id'> = {
                ...this.form.value,
                updatedAt: new Date().getTime(),
            }

            try {
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Rennserie wurde angelegt'})
                await this.raceService.addRaceSeries(raceSeries);
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        }
    }

    public onNavigateBack(): Promise<boolean> {
        return this.router.navigate(['dashboard', 'race-list']);
    }
}
