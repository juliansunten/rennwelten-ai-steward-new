import { inject, Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import {
    addDoc,
    collection,
    CollectionReference,
    collectionSnapshots, connectFirestoreEmulator, deleteDoc,
    doc,
    docSnapshots,
    DocumentData, DocumentReference,
    Firestore, setDoc
} from "@angular/fire/firestore";
import { FIRESTORE_PATHS } from "../const/firestore-path";
import { v4 as uuidv4 } from "uuid";
import { IPenalty } from "../../../../common/model/model";
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firestore.service';

@Injectable({
    providedIn: 'root'
})
export class PenaltyService {
    private firebaseService: FirebaseService = inject(FirebaseService);

    public getPenaltyList$(): Observable<IPenalty[]> {

        console.log('getPenaltyList$ was called');
        const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.penalties);

        return collectionSnapshots(colRef).pipe(
            map(docList => docList.map((doc) => ({
                ...doc.data(), id: doc.id,
            } as IPenalty))));
    }

    public getPenalty$(ruleId: string): Observable<IPenalty> {
        console.log('getPenalty$ was called');
        const docRef = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.penalties}/${ruleId}`);

        return docSnapshots(docRef).pipe(
            map((docSnap) => {
                return { ...docSnap.data(), id: docSnap.id } as IPenalty;
            })
        )
    }

    public addPenalty(penalty: Omit<IPenalty, 'id'>): Promise<DocumentData> {
        console.log('addPenalty was called with', penalty);
        const colRef: CollectionReference = collection(this.firebaseService.firestore, FIRESTORE_PATHS.penalties);

        const data: IPenalty = {
            id: uuidv4(),
            ...penalty,
            updatedAt: new Date().getTime(),
        }

        return addDoc(colRef, data);
    }

    public updatePenalty(penalty: IPenalty): Promise<void> {
        console.log('updatePenalty was called with', penalty);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.penalties}/${penalty.id}`);

        const data: IPenalty = {
            ...penalty,
            updatedAt: new Date().getTime(),
        }


        return setDoc(docRef, data, { merge: true });
    }

    public deletePenalty(ruleId: string): Promise<void> {
        console.log('deletePenalty was called with', ruleId);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.penalties}/${ruleId}`);

        return deleteDoc(docRef);
    }
}
