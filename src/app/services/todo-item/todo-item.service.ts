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

    constructor(private _http: HttpClient) {}

    getAllTodoItems(requestType: string = "all"): Observable<TodoItemUI[]> {
        return this._http.get<TodoItemUI[]>(`${this.getTodoItemEndpoint}?requestType=${requestType}`,  {
                headers: new  HttpHeaders().set('Content-Type', 'application/json'),
            })
            .map((todoItemsResult: TodoItem[]) => {
                console.log(todoItemsResult);
                return todoItemsResult;
            }).catch(error => Observable.throw(`Error in getAllTodoItems: ${error}`))
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}