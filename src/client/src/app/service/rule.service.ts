import {inject, Injectable} from '@angular/core';
import {IRule, IRuleList} from "../../../../common/model/model";
import {map, Observable} from "rxjs";
import {
    addDoc,
    collection,
    CollectionReference,
    collectionSnapshots,
    deleteDoc,
    doc,
    docSnapshots,
    DocumentData,
    DocumentReference,
    setDoc,
    writeBatch
} from "@angular/fire/firestore";
import {FIRESTORE_PATHS} from "../const/firestore-path";
import {v4 as uuidv4} from "uuid";
import {FirebaseService} from './firestore.service';

@Injectable({
    providedIn: 'root'
})
export class RuleService {
    private firebaseService: FirebaseService = inject(FirebaseService);

    public getRuleListList$(): Observable<IRuleList[]>{
        console.log('getRuleListList$ was called');
        const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.ruleList);

        return collectionSnapshots(colRef).pipe(
            map(docList => docList.map((doc) => ({
                ...doc.data(), id: doc.id,
            } as IRuleList))));
    }

    public getSingleRuleList$(ruleId: string): Observable<IRuleList>{
        console.log('getSingleRuleList$ was called');
        const docRef = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.ruleList}/${ruleId}`);

        return docSnapshots(docRef).pipe(
            map((docSnap) => {
                return {...docSnap.data(), id: docSnap.id} as IRuleList;
            })
        )
    }

    public addRuleListList(ruleList: Omit<IRuleList, 'id'>): Promise<DocumentData>{
        console.log('addRuleListList was called');
        const colRef: CollectionReference = collection(this.firebaseService.firestore, FIRESTORE_PATHS.ruleList);

        const data: IRuleList = {
            id: uuidv4(),
            ...ruleList,
            updatedAt: new Date().getTime(),
        }

        return addDoc(colRef, data);
    }

    public updateRuleList(ruleList: IRuleList): Promise<void>{
        console.log('updateRuleList was called with', ruleList);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.ruleList}/${ruleList.id}`);

        const data: IRuleList = {
            ...ruleList,
            updatedAt: new Date().getTime(),
        }

        return setDoc(docRef, data, {merge: true});
    }

    public deleteRuleList(ruleListId: string): Promise<void>{
        console.log('deleteRuleList was called with', ruleListId);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.ruleList}/${ruleListId}`);

        return deleteDoc(docRef);
    }

    public getRuleList$(): Observable<IRule[]>{
        console.log('getRuleList$ was called');
        const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.rules);

        return collectionSnapshots(colRef).pipe(
            map(docList => docList.map((doc) => ({
                ...doc.data(), id: doc.id,
            } as IRule))));
    }

    public getRule$(ruleId: string): Observable<IRule>{
        console.log('getRule$ was called');
        const docRef = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.rules}/${ruleId}`);

        return docSnapshots(docRef).pipe(
            map((docSnap) => {
                return {...docSnap.data(), id: docSnap.id} as IRule;
            })
        )
    }

    public addRule(rule: Omit<IRule, 'id'>): Promise<DocumentData>{
        console.log('addRule was called with', rule);
        const colRef: CollectionReference = collection(this.firebaseService.firestore, FIRESTORE_PATHS.rules);

        const data: IRule = {
            id: uuidv4(),
            ...rule,
            updatedAt: new Date().getTime(),
        }

        return addDoc(colRef, data);
    }

    public updateRule(rule: IRule): Promise<void>{
        const batch = writeBatch(this.firebaseService.firestore);
        console.log('updateRule was called with', rule);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.rules}/${rule.id}`);
        //TODO disable not active Rules
        const data: IRule = {
            ...rule,
            updatedAt: new Date().getTime(),
        }


        batch.set(docRef, data, {merge: true})

        return batch.commit();
    }

    public deleteRule(ruleId: string): Promise<void>{
        console.log('deleteRule was called with', ruleId);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.rules}/${ruleId}`);

        return deleteDoc(docRef);
    }
}
