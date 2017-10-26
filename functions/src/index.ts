// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as UpCaseMessages from './upcase-messages';
import * as AdsenseAccountReportGenerate from './adsense-account-report-generate';
import * as FeedItemIdMaker from './feed-item-id-Maker';
import * as FeedItemTimeStamper from './feed-item-timestamper';
import * as UserTimeStamper from './user-timestamper';

admin.initializeApp(functions.config().firebase);

// export const addMessage = AddMessage.listener;
// export const makeUpperCase = UpCaseMessages.listener;
export const adsenseAccountReportGenerate = AdsenseAccountReportGenerate.listener;
export const feedItemIdMaker = FeedItemIdMaker;
export const feedItemTimeStamper = FeedItemTimeStamper;
export const userTimeStamper = UserTimeStamper;

