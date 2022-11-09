import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    todoListId: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string
}

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(t => t.id !== action.todoListId);
        case 'ADD-TODOLIST':
            const newToDoList: TodoListType = {
                id: action.todoListId,
                todoListTitle: action.title,
                filter: 'all'
            };
            return [...todolists, newToDoList];
        case 'CHANGE-TODOLIST-TITLE':                                                                        ///////////////////////////
            return todolists.map(t => t.id === action.todoListId ? {...t, todoListTitle: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(t => t.id === action.todoListId ? {...t, filter: action.filter} : t);

        default :
            return todolists;
    }
};


export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListId: id});
export const AddTodoListAC = (title: string, ): AddTodoListAT => ({type:'ADD-TODOLIST', todoListId:v1(), title});
export const ChangeTodoListTitleAC = (title: string,id: string ): ChangeTodoListTitleAT => ({type:'CHANGE-TODOLIST-TITLE', todoListId:id, title});
export const ChangeTodoListFilterAC = (filter: FilterValuesType,id: string ): ChangeTodoListFilterAT => ({type:'CHANGE-TODOLIST-FILTER', todoListId:id, filter});