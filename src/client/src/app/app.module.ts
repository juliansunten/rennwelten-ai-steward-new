import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {AuthGuardModule} from "@angular/fire/auth-guard";
import {HttpClientModule} from '@angular/common/http';
import {MessagesModule} from "primeng/messages";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {DatePipe, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AuthGuardModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp({...environment.firebase})),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideFunctions(() => getFunctions()),
        providePerformance(() => getPerformance()),
        MessagesModule,
        DialogModule,
        ButtonModule,
        DatePipe,
        InputTextModule,
        NgIf,
        RippleModule,
        TableModule,
        TagModule
    ],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
