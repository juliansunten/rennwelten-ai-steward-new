import {inject, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {IDriver} from "../../../../common/model/model";
import {collection, collectionSnapshots, connectFirestoreEmulator, Firestore} from "@angular/fire/firestore";
import {FIRESTORE_PATHS} from "../const/firestore-path";
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private firebaseService: FirebaseService = inject(FirebaseService);
  public getDriverList$(): Observable<IDriver[]>{
      const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.users);

      return collectionSnapshots(colRef).pipe(
          map(docList => docList.map((doc) => ({
              ...doc.data(), uid: doc.id,
          } as IDriver))));
    }
}
