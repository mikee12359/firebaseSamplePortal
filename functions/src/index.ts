// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as UpCaseMessages from './upcase-messages';
import * as ShoutMessage from './shout-message';
import * as AddTodoItem from './add-todo-item';
import * as GetTodoItem from './get-todo-item';
import * as UpdateTodoItem from './update-todo-item';
const firebaseDevCredential = require('../credentials/todo-dev-a3a22-firebase-adminsdk-5tnf9-ddf4bd2624.json');

// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert(firebaseDevCredential),
    databaseURL: "https://todo-dev-a3a22.firebaseio.com"
});


// export const addMessage = AddMessage.listener;
// export const makeUpperCase = UpCaseMessages.listener;
// export const adsenseAccountReportGenerate = AdsenseAccountReportGenerate.listener;
// export const feedItemIdMaker = FeedItemIdMaker;
// export const feedItemTimeStamper = FeedItemTimeStamper;
// export const userTimeStamper = UserTimeStamper;
export const addTodoItem = AddTodoItem.listener;
export const getTodoItem = GetTodoItem.listener;
export const updateTodoItem = UpdateTodoItem.listener;
