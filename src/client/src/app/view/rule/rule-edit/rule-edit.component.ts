import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPenalty, IRule} from "../../../../../../common/model/model";
import {Subject, takeUntil} from "rxjs";
import {RuleService} from "../../../service/rule.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DANGER_TOAST, SUCCESS_TOAST} from "../../../const/toast";
import {PenaltyService} from "../../../service/penalty.service";

@Component({
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent {
    private ruleId: string | null = null;
    private unsubSub: Subject<boolean> = new Subject();
    public penaltyList: IPenalty[] = [];
    public form: FormGroup;

    constructor(
        private router: Router,
        private ruleService: RuleService,
        private penaltyService: PenaltyService,
        private activatedRoute: ActivatedRoute,
        private toast: MessageService,
    ){
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.ruleId = this.activatedRoute.snapshot.paramMap.get('id');
        }

        this.form = new FormGroup({
            title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            infoText: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
            chatMessage: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(30), Validators.maxLength(120)]}),
            isActive: new FormControl<boolean>(true, {nonNullable: true, validators: [Validators.required]}),
            eligiblePenalties: new FormControl<string[]>([], {nonNullable: true}),
        })
    }

    public ngOnInit(): void {
        this.penaltyService.getPenaltyList$()
            .pipe(takeUntil(this.unsubSub)).subscribe((penaltyList) => {
            this.penaltyList = penaltyList;
        })

        if(this.ruleId){
            this.ruleService.getRule$(this.ruleId)
                .pipe(takeUntil(this.unsubSub)).subscribe((rule) => {
                    console.log(rule);
                this.form.patchValue(rule);
            })
        }
    }
    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public async onSubmitRule(): Promise<void> {
        if (this.ruleId){
            const rule: IRule = {
                id: this.ruleId,
                ...this.form.value
            }

            try {
                await this.ruleService.updateRule(rule);
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Regel wurde aktualisiert'})
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        } else {
            //@ts-ignore
            const rule: Omit<IRule, 'id'> = {
                ...this.form.value
            }

            try {
                this.toast.add({...SUCCESS_TOAST, summary: 'Die Regel wurde angelegt'})
                await this.ruleService.addRule(rule);
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        }
    }

    public onNavigateBack(): Promise<boolean> {
        return this.router.navigate(['dashboard', 'rules']);
    }
}
