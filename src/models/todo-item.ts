export class TodoItem {
    id: string;
    content: string;
    isDone: boolean;
    createdAt: number;
    updatedAt: number;

    constructor(id: string, content: string, isDone: boolean = false){
        this.id = id;
        this.content = content;
        this.isDone = isDone;
    }
}

export class TodoItemUI extends TodoItem {
    isEditing: boolean;

    constructor(id: string, content: string, isDone: boolean = false, isEditing: boolean = false){
        super(id, content, isDone);
        this.isEditing = isEditing;
    }
}

