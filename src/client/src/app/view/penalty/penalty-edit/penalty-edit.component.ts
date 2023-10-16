import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPenalty, ISelectOption, PENALTY_CATEGORY} from "../../../../../../common/model/model";
import {DANGER_TOAST, SUCCESS_TOAST} from "../../../const/toast";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {PenaltyService} from "../../../service/penalty.service";
import {TranslatePenaltyCategoryPipe} from "../../../pipes/translate-penalty-category.pipe";

@Component({
  selector: 'app-penalty-edit',
  templateUrl: './penalty-edit.component.html',
  styleUrls: ['./penalty-edit.component.scss']
})
export class PenaltyEditComponent implements OnInit, OnDestroy {
    private penaltyId: string | null = null;
    private unsubSub: Subject<boolean> = new Subject();
    private translatePenaltyCategoryPipe = new TranslatePenaltyCategoryPipe()
    public readonly penaltyCategorySelectOptions: ISelectOption<PENALTY_CATEGORY>[];
    public form: FormGroup<{
        penaltyCategory: FormControl<PENALTY_CATEGORY>,
        points: FormControl<number>,
        title: FormControl<string>,
        reason: FormControl<string>,
    }>;

    constructor(
        private penaltyService: PenaltyService,
        private activatedRoute: ActivatedRoute,
        private toast: MessageService,
        private router: Router,
    ){
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.penaltyId = this.activatedRoute.snapshot.paramMap.get('id');
        }
        this.penaltyCategorySelectOptions = Object.keys(PENALTY_CATEGORY).map((p) => {
            return {label: this.translatePenaltyCategoryPipe.transform(p as PENALTY_CATEGORY), value: p as PENALTY_CATEGORY}
        });
        this.form = new FormGroup({
            penaltyCategory: new FormControl<PENALTY_CATEGORY>(PENALTY_CATEGORY.NONE, {nonNullable: true}),
            points: new FormControl<number>(1, {nonNullable: true, validators: []}),
            title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            reason: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(30)]}),
        })
    }

    public ngOnInit(): void {
        if(this.penaltyId){
            this.penaltyService.getPenalty$(this.penaltyId)
                .pipe(takeUntil(this.unsubSub)).subscribe((penalty) => {
                this.form.patchValue(penalty);
            })
        }
    }
    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public async onSubmitPenalty(): Promise<void> {
        if (this.penaltyId){
            //@ts-ignore
            const penalty: IPenalty = {
                id: this.penaltyId,
                ...this.form.value
            }

            try {
                await this.penaltyService.updatePenalty(penalty);
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Strafe wurde aktualisiert'})
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        } else {
            //@ts-ignore
            const penalty: Omit<IPenalty, 'id'> = {
                ...this.form.value
            }

            try {
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Strafe wurde angelegt'})
                await this.penaltyService.addPenalty(penalty);
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        }
    }

    public onNavigateBack(): Promise<boolean> {
        return this.router.navigate(['dashboard', 'penalties']);
    }
}
