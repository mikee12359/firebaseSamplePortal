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
    const prayerRequest = admin.database().ref('todoItems');
    var corsFn = cors(corsOptions);

    corsFn(request, response, async () => {
        let newTodoItem = new TodoItem();

        if (!request.query.id) {
            response.status(400).send("Error no Id!");
            return;
        }

        if (!request.query.content) {
            response.status(400).send("Error no content!");
            return;
        }

        newTodoItem.id = request.query.id;
        newTodoItem.content = request.query.content;
        newTodoItem.isDone = false;
        newTodoItem.createdAt = Date.now();
        newTodoItem.updatedAt = newTodoItem.createdAt;
        
        // let data = parseMessage(request.body);
        await prayerRequest.push(newTodoItem);

        response.status(200).send("Success!");
    });
});
