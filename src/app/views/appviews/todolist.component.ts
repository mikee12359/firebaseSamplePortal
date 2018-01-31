import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { AttendanceItem } from '../../../../functions/models/attendance-item';


@Component({
    selector: 'todolist',
    templateUrl: 'todolist.template.html'
})

export class TodoListComponent implements OnDestroy, OnInit {
    modalRef: BsModalRef;
    

    public constructor(private modalService: BsModalService) { }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public ngOnInit(): any {

    }

    public ngOnDestroy(): any {

    }
}