import { Partner } from '../../../models/partner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ShoutService {
    // private partner: FirebaseObjectObservable<any>;
    private shoutFunctionUri: string = "https://us-central1-xerkit-a2331.cloudfunctions.net/shoutMessage";

    constructor(private _firebaseDb: AngularFireDatabase, private _http: Http) {
        this.reset();
    }

    reset() {
    }

    getShoutText(textToShout: string): Observable<string> {
        return this._http.get(this.shoutFunctionUri + '?textToShout=' + textToShout)
        .map((resp: Response) => {
            if (!resp.ok) {
                throw new Error('Error in textToShout(textToShout: string)');
            }
            return resp.json();
        })
        .catch(error => Observable.throw(`Error in getShoutText(textToShout: string): ${error}`));
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}