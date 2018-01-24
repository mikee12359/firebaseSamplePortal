// import { ShoutService } from '../../services/shout/shout.service';
// import { observable } from 'rxjs/symbol/observable';
// import { ToasterService } from '../../services/toaster/toaster.service';
import { any } from 'codelyzer/util/function';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
// import { PartnerService } from '../../services/partner/partner.service';
// import { Partner } from '../../../models/partner';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { TodoItem, TodoItemUI } from '../../../models/todo-item';
import { TodoItemService } from 'app/services/todo-item/todo-item.service';

interface Employee {
  firstname: string;
  lastname: string;
  age: number;
}

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  employeeList: AngularFireList<Employee[]>
  employees = [];

  todoItems: TodoItemUI[] = [];

  isShowEditField(): boolean {
    return true;
  }

  public constructor(
    private db: AngularFireDatabase,
    private _router: Router,
    // private _partnerService: PartnerService,
    private _ngZone: NgZone,
    private _todoItemService: TodoItemService,
    // private _toastService: ToasterService,
    // private _shoutService: ShoutService
  ) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    this.nav.className += ' white-bg';
    const self = this;

    this._todoItemService.getAllTodoItems("all").subscribe(todoItems => {
      console.log("Logging inside startview");
      console.log(todoItems);

      self._ngZone.run(() => {
        self.todoItems = todoItems;
        // for (let i = 0; i < todoItems.length; i++){
        //   self.todoItems.push(new TodoItemUI(todoItems[i].id, todoItems[i].content, todoItems[i].isDone));
        // }
      });
    });

    // this.todoItems = [s
    //   new TodoItemUI('1', 'Buy a milk', false),
    //   new TodoItemUI('2', 'Get Married', false),
    //   new TodoItemUI('3', 'Serve God', false),
    //   new TodoItemUI('4', 'Graduate in College', true),
    //   new TodoItemUI('5', 'Find a job', true)
    // ]

    // if (this._partnerService.currentPartnerObject) {
    // } else {
    //   this._router.navigateByUrl("/login");
    // }
  }

  public editTodoItem(todoItem: TodoItemUI){
    console.log('editTodoItem');
    todoItem.isEditing = true;
  }

  public saveTodoItem(todoItem: TodoItemUI){
    console.log('saveTodoItem');
    todoItem.isEditing = false;
  }

  reset() {
    // Redo all initializations here for default values
    // or nulls - so that when new user logs in, he will
    // be given the proper data
  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
  }

}