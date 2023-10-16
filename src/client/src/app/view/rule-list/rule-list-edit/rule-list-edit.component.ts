import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RuleService} from "../../../service/rule.service";
import {IRule, IRuleList} from "../../../../../../common/model/model";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {DANGER_TOAST, SUCCESS_TOAST} from "../../../const/toast";

@Component({
    templateUrl: './rule-list-edit.component.html',
})
export class RuleListEditComponent implements OnInit, OnDestroy {
    private ruleListId: string | null = null;
    private unsubSub: Subject<boolean> = new Subject();

    public form: FormGroup<{
        title: FormControl<string>;
        infoText: FormControl<string>;
        isActive: FormControl<boolean>;
        rules: FormControl<IRule[]>;
    }>;
    public listOfRules: IRule[] = [];
    public filterValue: string = '';


    constructor(
        private router: Router,
        private ruleService: RuleService,
        private activatedRoute: ActivatedRoute,
        private toast: MessageService,
    ){
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.ruleListId = this.activatedRoute.snapshot.paramMap.get('id');
        }

        this.form = new FormGroup({
            title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
            infoText: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
            isActive: new FormControl<boolean>(true, {nonNullable: true, validators: [Validators.required]}),
            rules: new FormControl<IRule[]>([], {nonNullable: true}),
        })
    }

    public ngOnInit(): void {
        this.ruleService.getRuleList$()
            .pipe(
                takeUntil(this.unsubSub),
                map((r) => {
                    return r.filter((rule) => rule.isActive)
                })
            ).subscribe((listOfRules) => {
            this.listOfRules = listOfRules;
        })

        if(this.ruleListId){
            this.ruleService.getSingleRuleList$(this.ruleListId)
                .pipe(takeUntil(this.unsubSub)).subscribe((ruleList) => {
                this.form.patchValue(ruleList);
            })
        }
    }
    public ngOnDestroy(): void {
        this.unsubSub.next(true);
    }

    public async onSubmitRuleList(): Promise<void> {
        if (this.ruleListId){
            //@ts-ignore
            const ruleList: IRuleList = {
                id: this.ruleListId,
                ...this.form.value
            }

            try {
                await this.ruleService.updateRuleList(ruleList);
                this.toast.add({...SUCCESS_TOAST, summary: 'Das Regelwerk wurde aktualisiert'})
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        } else {
            //@ts-ignore
            const ruleList: Omit<IRuleList, 'id'> = {
                ...this.form.value
            }

            try {
                this.toast.add({...SUCCESS_TOAST, summary: 'Das Regelwerk wurde angelegt'})
                await this.ruleService.addRuleListList(ruleList);
            } catch (e) {
                this.toast.add({...DANGER_TOAST, summary: 'Beim Abspeichern ist ein Fehler aufgetreten'})
            }
        }
    }

    public onNavigateBack(): Promise<boolean> {
        return this.router.navigate(['dashboard', 'rule-list']);
    }
}
