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
        let newTodoItem = new TodoItem();

        if (!request.query.content) {
            response.status(400).send("Error no content!");
            return;
        }

        newTodoItem.content = request.query.content;
        newTodoItem.isDone = false;
        newTodoItem.createdAt = admin.database.ServerValue.TIMESTAMP;
        newTodoItem.updatedAt = newTodoItem.createdAt;
        
        // let data = parseMessage(request.body);
        let pushedKey: any;
        await todoItemsDatabaseRef.push(newTodoItem).then((newlyPushedData) => {
            pushedKey = newlyPushedData.key;
        });
        newTodoItem.id = pushedKey;
        await todoItemsDatabaseRef.child(pushedKey).set(newTodoItem);

        response.status(200).send(JSON.stringify(newTodoItem));
    });
});
