import {inject, Injectable} from '@angular/core';
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
    writeBatch
} from "@angular/fire/firestore";
import {FIRESTORE_PATHS} from "../const/firestore-path";
import {v4 as uuidv4} from "uuid";
import {FirebaseService} from "./firestore.service";
import {IRaceSeries} from "../../../../common/model/model";

@Injectable({
  providedIn: 'root'
})
export class RaceService {
    private firebaseService: FirebaseService = inject(FirebaseService);
    public getRaceSeriesList$(): Observable<IRaceSeries[]>{
        console.log('getRaceSeriesList$ was called');
        const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.raceSeries);

        return collectionSnapshots(colRef).pipe(
            map(docList => docList.map((doc) => ({
                ...doc.data(), id: doc.id,
            } as IRaceSeries))));
    }

    public getRaceSeries$(raceSeriesId: string): Observable<IRaceSeries>{
        console.log('getRaceSeries$ was called');
        const docRef = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.raceSeries}/${raceSeriesId}`);

        return docSnapshots(docRef).pipe(
            map((docSnap) => {
                return {...docSnap.data(), id: docSnap.id} as IRaceSeries;
            })
        )
    }

    public addRaceSeries(raceSeries: Omit<IRaceSeries, 'id'>): Promise<DocumentData>{
        console.log('addRaceSeries was called with', raceSeries);
        const colRef: CollectionReference = collection(this.firebaseService.firestore, FIRESTORE_PATHS.raceSeries);

        const data: IRaceSeries = {
            id: uuidv4(),
            ...raceSeries,
            updatedAt: new Date().getTime(),
        }

        return addDoc(colRef, data);
    }

    public updateRaceSeries(raceSeries: IRaceSeries): Promise<void>{
        const batch = writeBatch(this.firebaseService.firestore);
        console.log('updateRaceSeries was called with', raceSeries);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.raceSeries}/${raceSeries.id}`);
        //TODO disable not active RaceSeriess
        const data: IRaceSeries = {
            ...raceSeries,
            updatedAt: new Date().getTime(),
        }


        batch.set(docRef, data, {merge: true})
        return batch.commit();
    }

    public deleteRaceSeries(raceSeriesId: string): Promise<void>{
        console.log('deleteRaceSeries was called with', raceSeriesId);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.raceSeries}/${raceSeriesId}`);

        return deleteDoc(docRef);
    }
}
