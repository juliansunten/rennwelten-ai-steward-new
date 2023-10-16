import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
    private readonly TRACKS = {
        Acc: [
            'Monza Circuit'
        ],
        IRace: []
    }

    public getTracksBySimulation() {
        return this.TRACKS['Acc'];
    }

}
