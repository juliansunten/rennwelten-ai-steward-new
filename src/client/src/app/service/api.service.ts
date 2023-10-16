import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {IIncident} from "../../../../common/model/model";

@Injectable({providedIn: 'root'})
export class ApiService {

    baseURL: string = "http://localhost:3000/";

    constructor(private http: HttpClient) {
    }

    requestReplay(data: IIncident): Observable<any> {
        console.log('requestReplay', data)

        return this.http.post('http://localhost:3000/replay', data).pipe(
            catchError((e) => {
                console.log(e);
                return of(null)
            })
        )
    }

    connect(): Observable<any> {
        console.log('Connect')

        return this.http.post('http://localhost:3000/connect', "connect").pipe(
            catchError((e) => {
                console.log(e);
                return of(null)
            })
        )
    }

}
