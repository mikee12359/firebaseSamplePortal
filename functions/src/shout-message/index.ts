// src/upcase-messages/index.ts
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};


export const listener = functions.https.onRequest(async (request, response) => {

    var corsFn = cors(corsOptions);

    corsFn(request, response, () => {
        let textToShout: string = request.query.textToShout;

        if (!textToShout) {
            response.status(400).send("No Text Found");
            return;
        }

        let shoutedText: string = textToShout.toUpperCase();
        
        let shoutsRef = admin.database().ref("shouts");
        let shoutObject = {
            text: shoutedText
        };
        shoutsRef.push(shoutObject, (error) => {
            if (error){
                response.status(500).send(`Database Error ${error}`);
            } else {
                response.status(200).send(JSON.stringify(shoutedText));
            }
        });

        
    });


});