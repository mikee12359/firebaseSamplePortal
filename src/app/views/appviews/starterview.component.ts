// import { ShoutService } from '../../services/shout/shout.service';
// import { observable } from 'rxjs/symbol/observable';
// import { ToasterService } from '../../services/toaster/toaster.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
// import { PartnerService } from '../../services/partner/partner.service';
// import { Partner } from '../../../models/partner';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

interface Employee {
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  employeeList: FirebaseListObservable<Employee[]>
  employees = [];
  employeeListSubscription: Subscription;
  firstName: string = "";
  lastName: string = "";

  // textToShout: string;
  // shoutedText: string;

  // users: FirebaseListObservable<any[]>;
  // user: FirebaseObjectObservable<any>;

  public constructor(
    private db: AngularFireDatabase, 
    private _router: Router, 
    // private _partnerService: PartnerService, 
    private _ngZone: NgZone, 
    // private _toastService: ToasterService,
    // private _shoutService: ShoutService
  ) {
    this.nav = document.querySelector('nav.navbar');
    this.employeeList = db.list("xerkit");
    console.log( this.employeeList );
    // this.employeeList.push;
    // db.object('')
    // this.users = db.list('/users');
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";

    this.employeeListSubscription = this.employeeList.subscribe((result: Employee[]) => {
      this.employees = result;
    })
    // if (this._partnerService.currentPartnerObject) {
    // } else {
    //   this._router.navigateByUrl("/login");
    // }
  }

  reset() {
    // Redo all initializations here for default values
    // or nulls - so that when new user logs in, he will
    // be given the proper data
  }

  public addingDataToDatabase(): void {
    // console.log(this.employeeList);
    this.employeeList.push({
      firstname: this.firstName,
      lastname: this.lastName
    });
    // console.log(this.lastName);
  }

  // onShoutClick(){
  //   var self = this;
  //   let getShoutTextSubscription = this._shoutService.getShoutText(this.textToShout).subscribe((shoutedText: string) => {
  //     self._toastService.infoToast(shoutedText);
  //     self.shoutedText = shoutedText;
  //     getShoutTextSubscription.unsubscribe();
  //   })
  // }

  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }
  
}


// splitSortingInputNumber() {
//   // console.dir(this.sortedString.split(",").map(i => parseInt(i)));
//   // if(this.sortedString = "string"){}
//   this.sortedNumber = this.sortedString.split(",").map(i => parseInt(i))
//   console.log(this.sortedNumber); // split -method is used to split a string into an array of substrings, and returns the new array.
//   this.sort(this.sortedNumber);


//   console.log(this.sortedNumber);
// }
