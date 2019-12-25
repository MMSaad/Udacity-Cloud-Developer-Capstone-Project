import {TodoItem} from "../models/todoItem"


/**
 * ToDo list result 
 * including ToDos data and last evaluted key
 */
export class TodoListResult{
    data: TodoItem[]
    lastId?: object
}