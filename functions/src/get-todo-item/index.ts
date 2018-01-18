import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { CorsOptions } from 'cors';
import { async } from 'q';
import { TodoItem } from '../../models/todo-item';

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};

export const listener = functions.https.onRequest(async(request, response) => {
    const todoItemsDatabaseRef = admin.database().ref('todoItems');
    var corsFn = cors(corsOptions);

    corsFn(request, response, async () => {
        let requestType = request.query.requestType || "all";

        // GetAll
        if (requestType == "all"){
            let allTodoItems: TodoItem[] = [];
            await todoItemsDatabaseRef.once("value", snap => {
                // let data = snap.val();
                // let data = JSON.stringify(snap.numChildren());
                allTodoItems = snap.val();
                response.status(200).send(JSON.stringify(allTodoItems));
                return;
            });
        } else if (requestType == "one"){ // GetOneById
            response.status(200).send("One!");
        } else { // filtered
            response.status(200).send("Filtered!");
        }

        response.status(500).send("Server Error");
    });
});
