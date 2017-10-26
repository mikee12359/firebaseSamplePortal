import { Partner } from '../../../models/partner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PartnerService {
    private partner: FirebaseObjectObservable<any>;
    private cloudFunctionsApiUri: string = "https://us-central1-soblessed-86039.cloudfunctions.net";

    private currentPartnerSource = new Subject<Partner>();
    currentPartner$ = this.currentPartnerSource.asObservable();
    currentPartnerObject: any = null;

    setCurrentPartner(partner: Partner) {
        this.currentPartnerObject = partner;
        this.currentPartnerSource.next(partner);
    }

    constructor(private _firebaseDb: AngularFireDatabase, private _http: Http) {
        this.reset();
    }

    reset() {
        this.setCurrentPartner(null);
    }

    setCurrentPartnerByUid(uid: string) {
        this._firebaseDb.object(`/partners/${uid}`).subscribe((partnerResult: Partner) => {
            console.log(partnerResult);
            this.setCurrentPartner(partnerResult);
        }, error => {
            console.error(error);
            throw new Error(error);
        });
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}