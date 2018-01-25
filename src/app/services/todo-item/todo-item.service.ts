import { Partner } from '../../../models/partner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TodoItem, TodoItemUI } from 'models/todo-item';

@Injectable()
export class TodoItemService { 
    // jsonHeaders = new Headers({"Content-Type": "application/json"});
    // jsonOptions = new RequestOptions({ headers: this.jsonHeaders });
    
    getTodoItemEndpoint = "http://localhost:5000/todo-dev-a3a22/us-central1/getTodoItem";
    deleteTodoItemEndpoint = "http://localhost:5000/todo-dev-a3a22/us-central1/deleteTodoItem";
    updateTodoItemEndpoint = "http://localhost:5000/todo-dev-a3a22/us-central1/updateTodoItem";
    addTodoItemEndpoint = "http://localhost:5000/todo-dev-a3a22/us-central1/addTodoItem";

    constructor(private _http: HttpClient) {}

    // ENDPOINT METHOD, RETURN_DATA, PARAMATER_STRUCTURE
    // pogi.com/ispogi GET, boolean (true || false), id

    // http://localhost:5000/todo-dev-a3a22/us-central1/getTodoItem GET, TodoItem[], requestType = "all" || "filtered" || "single" 
    // http://localhost:5000/todo-dev-a3a22/us-central1/addTodoItem GET, TodoItem, (content)
    // http://localhost:5000/todo-dev-a3a22/us-central1/updateTodoItem PUT, boolean, TodoItem
    // http://localhost:5000/todo-dev-a3a22/us-central1/deleteTodoItem DELETE, boolean, (id)

    getAllTodoItems(requestType: string = "all"): Observable<TodoItemUI[]> {
        return this._http.get<TodoItemUI[]>(`${this.getTodoItemEndpoint}?requestType=${requestType}`,  {
                headers: new  HttpHeaders().set('Content-Type', 'application/json'),
            })
            .map((todoItemsResult: TodoItemUI[]) => {
                console.log(todoItemsResult);
                return todoItemsResult;
            }).catch(error => Observable.throw(`Error in getAllTodoItems: ${error}`));
    }

    deleteTodoItem(id: string): Observable<boolean> {
        return this._http.delete(`${this.deleteTodoItemEndpoint}?id=${id}`,  {
            headers: new  HttpHeaders().set('Content-Type', 'application/json'),
        }).map((isDeleted: boolean) => {
            return isDeleted;
        }).catch(error => Observable.throw(`Error in deleteTodoItem: ${error}`));
    }

    updateTodoItem(todoItem: TodoItemUI): Observable<boolean> {
        return this._http.put(this.updateTodoItemEndpoint, todoItem, {
            headers: new  HttpHeaders().set('Content-Type', 'application/json'),
        }).map((isUpdated: boolean) => {
            return isUpdated;
        }).catch(error => Observable.throw(`Error in updateTodoItem: ${error}`));
    }

    addTodoItem(content: string): Observable<TodoItemUI> {
        return this._http.get(`${this.addTodoItemEndpoint}?content=${content}`, {
            headers: new  HttpHeaders().set('Content-Type', 'application/json'),
        }).map((todoItemFromDatabase: TodoItemUI) => {
            return todoItemFromDatabase;
        }).catch(error => Observable.throw(`Error in addTodoItem: ${error}`));;
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}