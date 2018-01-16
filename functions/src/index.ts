// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as UpCaseMessages from './upcase-messages';
import * as ShoutMessage from './shout-message';
import * as AddTodoItem from './add-todo-item';

admin.initializeApp(functions.config().firebase);

// export const addMessage = AddMessage.listener;
// export const makeUpperCase = UpCaseMessages.listener;
// export const adsenseAccountReportGenerate = AdsenseAccountReportGenerate.listener;
// export const feedItemIdMaker = FeedItemIdMaker;
// export const feedItemTimeStamper = FeedItemTimeStamper;
// export const userTimeStamper = UserTimeStamper;
export const addTodoItem = AddTodoItem.listener;
