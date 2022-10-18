import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
//rsc
type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListId);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListId);
        };

        return (
            <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                <input
                    onChange={changeTaskStatus}
                    type={'checkbox'}
                    checked={t.isDone}
                />
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        );
    };

    const tasksList = props.tasks.length
        ? <ul>{props.tasks.map(getTasksListItem)}</ul>
        : <span>Ты всё выполнил, тупица!!!</span>;

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId);
    };

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId);

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId);
    };
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>&#128169;</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            {tasksList}
            <div>
                <button
                    className={props.filter === 'all' ? 'active-btn btn' : 'btn'}
                    onClick={handlerCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-btn btn' : 'btn'}
                    onClick={handlerCreator('active')}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-btn' : 'btn'}
                    onClick={handlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;