import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { AttendanceItem } from '../../models/attendance-item';
import { CorsOptions } from 'cors';
import { async } from 'q';
import { request } from 'https';

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};

export const listener = functions.https.onRequest(async(request, response) => {
    const attendanceItemsDatabaseRef = admin.database().ref('attendanceItems');
    var corsFn = cors(corsOptions);

    corsFn(request, response, async () => {
        let newAttendanceItem = new AttendanceItem();
      
        newAttendanceItem.name = request.query.name;
        newAttendanceItem.phone = request.query.phone;
        newAttendanceItem.address = request.query.admin;
        newAttendanceItem.isDone = false;
        newAttendanceItem.createdAt = request.query.createdAt;

        let pushedKey: any;
        await attendanceItemsDatabaseRef.push(newAttendanceItem).then((newlyPushedData) => {
            pushedKey = newlyPushedData.key;
        });
        newAttendanceItem.id = pushedKey;
        await attendanceItemsDatabaseRef.child(pushedKey).set(newAttendanceItem);

        response.status(200).send(JSON.stringify(newAttendanceItem));
    });
});