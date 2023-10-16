import {inject, Injectable} from '@angular/core';
import {Firestore,} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    public firestore: Firestore = inject(Firestore);

    constructor(){
        // if (environment.useEmulators) {
        //     connectFirestoreEmulator(this.firestore, environment.emulatorHost, 8080)
        // }
    }


}
