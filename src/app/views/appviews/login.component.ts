import { PartnerService } from '../../services/partner/partner.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {
  user: Observable<firebase.User>;
  email: string;
  password: string;
  isLoggingIn: boolean = false;

  constructor(private _partnerService: PartnerService, public afAuth: AngularFireAuth, public _Router: Router, public _toasterService: ToasterService) {
    this.user = afAuth.authState;
  }

  prepareOnSuccessLogin(userResult: firebase.User){
    console.log("Preparing On Success Login");
    this._partnerService.setCurrentPartnerByUid(userResult.uid);

    this._partnerService.currentPartner$.subscribe(partner => {
      if (partner){
        this._toasterService.successToast("Successfully Logged In", "Welcome to SoBlessed Partner Portal!");
        this._Router.navigateByUrl("/starterview");
      }
    }, error => {
      this._toasterService.errorToast("Error Logging In", "Please check your authentication details.");
      console.log(error);
    })
  }

  login() {
    this.isLoggingIn = true;
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((userResult: firebase.User) => {
      this.isLoggingIn = false;    
      console.log("Success Login!", userResult);
      this.prepareOnSuccessLogin(userResult);
    }).catch(error => {
      this.isLoggingIn = false;    
      this._toasterService.errorToast("Error Logging In", "Please check your authentication details.");
      console.log(error);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isValidForm() {
    return (this.email && this.password);
  }
}
