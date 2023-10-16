export enum USER_TYPE {
    ADMIN = 'ADMIN',
    STEWARD = 'STEWARD',
    DRIVER = 'DRIVER',
    NONE = 'NONE',
}

export interface IRegisterFormData {
    firstName: string;
    lastName: string;
    userType: USER_TYPE[];
    email: string;
    password: string;
    passwordRepeat: string;
}

export interface IUser {
    uid?: string;
    firstName: string;
    lastName: string;
    displayName: string;
    userType: USER_TYPE[];
    email: string | null;
    discord: string;
    photoURL: string;
}

export interface ICredentials {
    password: string;
    email: string;
}


export enum REGISTER_METHOD {
    'EMAIL_AND_PASSWORD' = 'EMAIL_AND_PASSWORD',
    'GOOGLE' = 'GOOGLE',
}

export interface IDriver extends IUser {
    races: IRace;
}

export interface Model {
    key: string;
    routeEvent?: boolean;
}

export interface IPosition {
    x: string;
    y: string;
}

export enum FLAG {
    'BLUE' = 'BLUE',
    'YELLOW' = 'YELLOW',
    'RED' = 'RED',
    'NONE' = 'NONE',
}

export enum PENALTY_CATEGORY {
    'SPEEDING_IN_PIT' = 'SPEEDING_IN_PIT',
    'NOT_ALLOWED_RETURN_TO_GARAGE' = 'NOT_ALLOWED_RETURN_TO_GARAGE',
    'NONE' = 'NONE',
}

export interface IPenalty {
    id: string;
    title: string;
    reason: string;
    chatMessage: string;
    penaltyCategory: PENALTY_CATEGORY;
    points: number;
    updatedAt?: number;
}

export interface IRule {
    id: string;
    title: string;
    infoText: string;
    isActive: boolean;
    eligiblePenalties: IPenalty[];
    updatedAt?: number;
}

export interface IRuleList {
    id: string;
    title: string;
    infoText: string;
    rules: IRule[];
    isActive: boolean;
    updatedAt?: number;
}


export interface ICarIdentifier {
    playerCarID: string;
    sessionIndex: string;
}

export interface ICarPosition {
    gapAhead: number;
    gapBehind: number;
}

export interface IRace {
    trackName: string;
    trainingDateTime: number;
    qualifyingDateTime: number;
    mainEventDateTime: number;
}

export type TRaceSimulation = 'Acc' | 'IRace';

export interface IRaceSeries {
    id: string;
    title: string;
    raceSimulation: TRaceSimulation;
    ruleListId: string;
    date: number;
    races: IRace[];
    updatedAt: number;
}

export interface IVideo {
    bucketPath: string;
    title: string;
    duration: string;
}

export enum APPEAL_STATUS {
    NONE = 'NONE',
    ACTIVE = 'ACTIVE',
    REJECTED = 'REJECTED',
    RESOLVED = 'RESOLVED',
}

export enum INCIDENT_STATUS {
    OPEN = 'OPEN',
    IN_REVIEW = 'IN_REVIEW',
    REVIEWED = 'REVIEWED',
}

export interface IPhysics {
    gas: number;
    brake: number;
    gear: number;
    rpms: number;
    steerAngle: number;
    speedKmh: number;
    carDamageFront: number,
    carDamageRear: number,
    carDamageLeft: number,
    carDamageRight: number,
    carDamageCenter: number,
    realTimeMs: number,
}

export interface IReplayTime {
    stewardId: string;
    replayTimeMs: number
}


export interface IIncident {
    id?: string;
    trackName?: string;
    trackId?: number;
    involvedCarIds?: number[];
    involvedCarLaps?: number[];
    involvedCarNumbers?: number[];
    involvedCarRaceNumbers?: number[];
    involvedCarDrivers?: any[];
    replayTimes: IReplayTime[];
    incidentStatus: INCIDENT_STATUS;
    assignedUser?: IUser;
    appealStatus: APPEAL_STATUS;
    updatedAt: number;
    createdAt: number;
    involvedCarInfos: any;
    accidentRealTime: number;
    sessionType: string
}

export interface IAccident extends IIncident {
    physics: IPhysics[] | null;
    carId: number;
    accidentId: string | null;
    currentLap: number
}

export interface IInvolvedCarInfo {
    carId: number;
    hasPushedPhysics: boolean
}

export interface IInvolvedCarsData {
    CarIndex: number;
    physics: IPhysics[];
}


export interface IAccidentMessage {
    timeInGame: number,
    carId: number,
    carRaceNumber: number,
    carData: ICarData,
    accidentRealTime: number
}

export interface ICarData {
    CarIndex: number;
    CarModelType: string; // You can replace 'string' with the actual type of CarModelType
    TeamName: string;
    RaceNumber: number;
    CupCategory: string; // You can replace 'string' with the actual type of CupCategory
    CurrentDriverIndex: number;
    Drivers: any[]; // You can replace 'string' with the actual type of Drivers
    Nationality: number;
}

export interface IVerdict {
    race: IRace;
    penalties: IPenalty[];
    accused: IDriver;
    brokenRules: IRule[]
}

export interface ISelectOption<T> {
    label: string;
    value: T;
}
