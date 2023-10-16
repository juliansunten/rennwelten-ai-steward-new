import {inject, Injectable} from '@angular/core';
import {IVerdict} from "../../../../common/model/model";
import {BehaviorSubject, Observable} from "rxjs";
import {connectFirestoreEmulator, Firestore} from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class VerdictService {
    private verdictListSub: BehaviorSubject<IVerdict[]> = new BehaviorSubject<IVerdict[]>([]);
    private firebaseService: FirebaseService = inject(FirebaseService);

    public getVerdictList$(): Observable<IVerdict[]> {
        return this.verdictListSub.asObservable();
    }
}
