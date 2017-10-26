import { Router } from '@angular/router';
import { PartnerService } from '../../services/partner/partner.service';
import { Partner } from '../../../models/partner';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;

  // users: FirebaseListObservable<any[]>;
  // user: FirebaseObjectObservable<any>;

  public constructor(db: AngularFireDatabase, private _router: Router, private _partnerService: PartnerService, private _ngZone: NgZone) {
    this.nav = document.querySelector('nav.navbar');
    // db.object('')
    // this.users = db.list('/users');
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    if (this._partnerService.currentPartnerObject) {
    } else {
      this._router.navigateByUrl("/login");
    }
  }

  reset() {
    // Redo all initializations here for default values
    // or nulls - so that when new user logs in, he will
    // be given the proper data
  }

  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }
}
