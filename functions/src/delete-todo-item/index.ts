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

export const listener = functions.https.onRequest(async (request, response) => {
    const todoItemsDatabaseRef = admin.database().ref('todoItems');
    var corsFn = cors(corsOptions);

    corsFn(request, response, async () => {
        if (request.method != "DELETE") {
            response.status(400).send("Request Method not supported!");
        }

        // Get the id
        let todoItemDeleteData = new TodoItem();
        todoItemDeleteData = request.body;

        // Delete from database
        todoItemsDatabaseRef.child(todoItemDeleteData.id).remove((error) => {
            if (error) {
                response.status(400).send("Unable to delete item");
                return;
            }
        }).then(() => {
            response.status(200).send(`Item ${todoItemDeleteData.id} has been successfully deleted.`);
            return;
        })
    });
});
