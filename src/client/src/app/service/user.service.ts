import { inject, Injectable } from '@angular/core';
import {
    arrayUnion,
    collection,
    collectionSnapshots,
    connectFirestoreEmulator,
    doc,
    docSnapshots,
    Firestore,
    setDoc, updateDoc,
    writeBatch
} from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IRegisterFormData, IUser, USER_TYPE } from "../../../../common/model/model";
import { FIRESTORE_PATHS } from "../const/firestore-path";
import { v4 as uuidv4 } from "uuid";
import { UserCredential } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firestore.service';


@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly USER_COLLECTION_PATH = 'users';
    private firebaseService: FirebaseService = inject(FirebaseService);
    private userListSub: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
    public userList$: Observable<IUser[]>;

    constructor() {
        this.getUserList$().subscribe((userList) => {
            this.userListSub.next(userList);
        })
        this.userList$ = this.userListSub.asObservable();
    }

    private getUserList$(): Observable<IUser[]> {
        const colRef = collection(this.firebaseService.firestore, FIRESTORE_PATHS.users);

        return collectionSnapshots(colRef).pipe(
            map((docSnapList) => {
                return docSnapList.map((snap) => {
                    return { ...snap.data() as IUser }
                })
            }));
    }

    public addUserDataIfNotExists(userData: IUser): Promise<void> {
        const uid = userData?.uid ? userData.uid : uuidv4();
        const docRef = doc(this.firebaseService.firestore, `${this.USER_COLLECTION_PATH}/${uid}`);

        return setDoc(docRef, { ...userData }, { merge: false })
            .then((docRef) => {
                console.log('addUserDataIfNotExists was successful and returned: ', docRef);
            }).catch((err) => {
                console.error('addUserDataIfNotExists failed with error: ', err);
            });
    }

    public updateUserRole(uid: string, userType: any): Promise<void> {
        console.log(userType);
        const docRef = doc(this.firebaseService.firestore, `${this.USER_COLLECTION_PATH}/${uid}`);

        return updateDoc(docRef, {userType})
            .then((docRef) => {
                console.log('updateUserRole was successful and returned: ', docRef);
            }).catch((err) => {
                console.error('updateUserRole failed with error: ', err);
            });
    }

    public getUserById$(uid: string): Observable<IUser> {
        const userDocRef = doc(this.firebaseService.firestore, `${this.USER_COLLECTION_PATH}/${uid}`);

        return docSnapshots(userDocRef).pipe(
            map((docSnap) => {
                return { ...docSnap.data(), uid: docSnap.id } as IUser;
            })
        )
    }

    public async createUserWithProfileAndRoles(
        user: UserCredential,
        registerFormData: IRegisterFormData,
    ): Promise<void> {
        const batch = writeBatch(this.firebaseService.firestore);
        const { uid, email, displayName, photoURL, emailVerified } = user.user;
        const { firstName, lastName, userType } = registerFormData;
        console.log('registerFormData', registerFormData);

        const userWithRoles: IUser = {
            uid,
            firstName: firstName ? firstName : '',
            lastName: lastName ? lastName : '',
            displayName: displayName ? displayName : `${firstName} ${lastName}`,
            userType: userType ? userType : [USER_TYPE.DRIVER],
            email,
            discord: '',
            photoURL: photoURL ? photoURL : '',
        };

        console.log('userWithRoles', userWithRoles);


        const docRef = doc(this.firebaseService.firestore, `${this.USER_COLLECTION_PATH}/${uid}`);
        batch.set(docRef, userWithRoles);
        return batch.commit();
    }
}
