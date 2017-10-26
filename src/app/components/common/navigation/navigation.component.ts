import { Partner } from '../../../../models/partner';
import { PartnerService } from '../../../services/partner/partner.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-slimscroll';

declare var jQuery: any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit {
  currentPartner: Partner = null;

  constructor(private router: Router, private _partnerService: PartnerService, private _ngZone: NgZone) {
    
  }

  public ngOnInit(): any {
    this.reset();

    if (this._partnerService.currentPartnerObject){
      if (!this.currentPartner) {
        this.currentPartner = this._partnerService.currentPartnerObject;
      }
    } else {
      this.currentPartner = null;
    }
  }

  reset(){
    this.currentPartner = null;
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }


}
