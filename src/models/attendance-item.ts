export class AttendanceItem {
    id: string;
    name: string;
    phone: number;
    address: string;
    isDone: boolean;
    createdAt: number;

    constructor(id: string, name: string,phone: number,address: string, isDone: boolean = false){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.isDone = isDone;
    }
}

// export class TodoItemUI extends TodoItem {
//     isEditing: boolean;

//     constructor(id: string, content: string, isDone: boolean = false, isEditing: boolean = false){
//         super(id, content, isDone);
//         this.isEditing = isEditing;
//     }
// }

