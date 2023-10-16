import {inject, Injectable} from '@angular/core';
import {IAccident, IIncident,} from "../../../../common/model/model";
import {map, Observable} from "rxjs";
import {
    collection,
    collectionSnapshots,
    deleteDoc,
    doc,
    docSnapshots,
    DocumentReference,
    getDocs,
    updateDoc
} from "@angular/fire/firestore";
import {FIRESTORE_PATHS} from "../const/firestore-path";
import {FirebaseService} from './firestore.service';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    private firebaseService: FirebaseService = inject(FirebaseService);
    private userService: UserService = inject(UserService);

    public getAccidentList$(): Observable<IAccident[]> {
        console.log('getAccidentList$ was called');
        const accidentColRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.accidents);

        return collectionSnapshots(accidentColRef).pipe(
            map(docList => docList.map((doc) => {
                    console.log(doc.data());
                    return ({
                        ...doc.data(), id: doc.id,
                    } as IAccident)
                }
            )));
    }

    public async getInvolvedCarsData(incidentId: string) {
        console.log('getInvolvedCarsData was called');
        const involvedCarsData: any[] = []
        const involvedCarsDataColRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.accidents, incidentId, FIRESTORE_PATHS.involvedCarsData);
        const querySnapshot = await getDocs(involvedCarsDataColRef);

        querySnapshot.forEach((doc) => {
            involvedCarsData.push(doc.data())
            // doc.data() is never undefined for query doc snapshots
        });

        return involvedCarsData;
    }

    public getIncident$(incidentId: string): Observable<IIncident> {
        console.log('getIncident$ was called');
        const docRef = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.incidents}/${incidentId}`);

        return docSnapshots(docRef).pipe(
            map((docSnap) => {
                return {...docSnap.data(), id: docSnap.id} as IIncident;
            })
        )
    }

    public updateAccident(accidentId: string, data: any): void {
        try {
            console.log("Data ", data)
            const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.accidents}/${accidentId}`);

            const incidentData = {
                ...data,
                updatedAt: new Date().getTime(),
            }
            updateDoc(docRef, {...incidentData}).then(() => console.log("Updated"))
        } catch (e) {
            console.error("Error on updateAccident ", e)
        }
    }

    public deleteIncident(incidentId: string): Promise<void> {
        console.log('deleteIncident was called with', incidentId);
        const docRef: DocumentReference = doc(this.firebaseService.firestore, `${FIRESTORE_PATHS.incidents}/${incidentId}`);

        return deleteDoc(docRef);
    }
}
