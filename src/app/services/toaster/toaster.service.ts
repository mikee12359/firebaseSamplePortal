import { Injectable } from "@angular/core";

declare var toastr: any;

@Injectable()
export class ToasterService {
    // Options
    private showCloseButton: boolean = true;
    private showProgressBar: boolean = true;
    private showingMethod: string = 'slideDown'; // slideDown, slideUp, fadeIn, fadeOut
    private toasterTimeout: number = 4000;


    constructor() {
        // Initialization with default values
        this.setToasterOptions();
    }

    setToasterOptions() {
        toastr.options = {
            closeButton: this.showCloseButton,
            progressBar: this.showProgressBar,
            showMethod: this.showingMethod,
            timeOut: this.toasterTimeout
        };
    }

    setShowCloseButton(showCloseButton: boolean){
        this.showCloseButton = showCloseButton;
    }

    setShowProgressBar(showProgressBar: boolean){
        this.showProgressBar = showProgressBar;
    }

    setShowingMethod(showingMethod: string){
        this.showingMethod = showingMethod;
    }

    setToasterTimeout(toasterTimeout: number){
        this.toasterTimeout = toasterTimeout;
    }

    successToast(title: string = "", message: string = "") {
        toastr.success(title, message);
    }

    warningToast(title: string = "", message: string = "") {
        toastr.warning(title, message);
    }

    errorToast(title: string = "", message: string = "") {
        toastr.error(title, message);
    }

    infoToast(title: string = "", message: string = "") {
        toastr.info(title, message);
    }

    clearToasts(withAnimation: boolean = true) {
        withAnimation ? toastr.clear() : toastr.remove();
    }
}