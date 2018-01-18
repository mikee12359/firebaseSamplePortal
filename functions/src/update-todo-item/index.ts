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
        if (request.method != "PUT") {
            response.status(400).send("Request Method not supported!");
        }

        let todoItemUpdateData = new TodoItem();
        todoItemUpdateData = request.body;

        if (!todoItemUpdateData.id) {
            response.status(400).set("Missing Id!");
            return;
        }

        console.log("Getting Ref");
        const todoItemRef = todoItemsDatabaseRef.child(todoItemUpdateData.id);

        let todoItemFromDatabase = new TodoItem();

        console.log("Before getting item");

        // get the item from database
        let noValue = false;
        await todoItemRef.once("value", snap => {
            if (!snap.val()) {
                noValue = true;
            }

            todoItemFromDatabase = snap.val();
        });

        if (noValue){
            response.status(400).send("Item not found");
            return;
        }

        console.log("Got value from database");

        // update the fields of the item
        todoItemFromDatabase.content = todoItemUpdateData.content;
        todoItemFromDatabase.isDone = todoItemUpdateData.isDone;
        todoItemFromDatabase.updatedAt = admin.database.ServerValue.TIMESTAMP;

        // Update Database
        await todoItemRef.set(todoItemFromDatabase).then(() => {
            response.status(200).send(`Success Updating Item ${todoItemFromDatabase.id}`);
            return;
        });

        response.status(500).send("Database update error");
    });
});
