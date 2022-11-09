import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

type ActionsType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            };
        }

        case 'Add-TASK':
            return {
                ...state,

                [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                }, ...state[action.todoListId]],

            };

        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.newIsDone
                } : task)
            };
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.newTitle
                } : task)
            };
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            };
        }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState

        default :
            return state;
    }
};


export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const;
};

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'Add-TASK', title, todoListId} as const;
};

export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string) => {
    return {type: 'CHANGE-STATUS-TASK', taskId, newIsDone, todoListId} as const;
};

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => {
    return {type: 'CHANGE-TITLE-TASK', taskId, newTitle, todoListId} as const;
};


