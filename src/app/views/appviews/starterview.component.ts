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

// interface Employee {
//   firstname: string;
//   lastname: string;
//   age: number;
// }

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  // employeeList: AngularFireList<Employee[]>
  // employees = [];

  todoItems: TodoItemUI[] = [];
  activeTodoItems: TodoItemUI[] = [];
  doneTodoItems: TodoItemUI[] = [];

  addedUnsavedTodoItem: Boolean = false;

  isShowEditField(): boolean {
    return true;
  }

  refreshTodoItems(){
    this.refreshActiveTodoItems();
    this.refreshDoneTodoItems();
  }

  refreshActiveTodoItems(){
    this.activeTodoItems = this.todoItems.filter(todoItem => todoItem.isDone == false);
  }

  refreshDoneTodoItems(){
    this.doneTodoItems = this.todoItems.filter(todoItem => todoItem.isDone == true);
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
        self.refreshTodoItems();
      });
    });

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
    const self = this;

    if (todoItem.id == null){
      this._todoItemService.addTodoItem(todoItem.content).subscribe(todoItemFromDatabase => {
        console.log(todoItemFromDatabase);

        self._ngZone.run(() => {
          console.log("Inside zone");
          todoItem.id = todoItemFromDatabase.id;
          todoItem.isDone = todoItemFromDatabase.isDone;
          // todoItem = todoItemFromDatabase;
          todoItem.isEditing = false;
          self.refreshTodoItems();
          self.addedUnsavedTodoItem = false;
        });
        
      }, err => {
        todoItem.isEditing = true;
        alert("There was a problem - Item has not been added!");
        console.log("Error in saveTodoItem()");
      })
    } else {
      this._todoItemService.updateTodoItem(todoItem).subscribe(isUpdated => {
        todoItem.isEditing = false;
      }, error => {
        todoItem.isEditing = true;
        alert("There was a problem - Item has not been saved!");
        console.log("Error in saveTodoItem()");
      })
    }
  }


  public addTodoItem(){
    if (this.addedUnsavedTodoItem) return;

    this.addedUnsavedTodoItem = true;
    let newTodoItem = new TodoItemUI(null, null, false, true);
    this.todoItems.push(newTodoItem);
    this.refreshTodoItems();
  }

  public doneTodoItem(todoItem: TodoItemUI){
    todoItem.isDone = true;

    this._todoItemService.updateTodoItem(todoItem).subscribe(isUpdated => {
      this.refreshTodoItems();
    }, error => {
      todoItem.isDone = false;
      console.log("Error in doneTodoItem()");
    })
  }

  public undoneTodoItem(todoItem: TodoItemUI){
    todoItem.isDone = false;
    
    this._todoItemService.updateTodoItem(todoItem).subscribe(isUpdated => {
      this.refreshTodoItems();
    }, error => {
      todoItem.isDone = true;
      console.log("Error in undoneTodoItem()");
    })
  }

  public deleteTodoItem(todoItem: TodoItemUI){
    if (todoItem.id == null){
      this.todoItems.splice(this.todoItems.length - 1, 1);
      this.addedUnsavedTodoItem = false;
      this.refreshTodoItems();
      return;
    }

    let confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete){
      this._todoItemService.deleteTodoItem(todoItem.id).subscribe(isDeleted => {
        let index = this.todoItems.findIndex(t => t.id == todoItem.id);
        this.todoItems.splice(index, 1);

        this.refreshTodoItems();
      }, error => { 
        // Handle error
      })
    }
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
