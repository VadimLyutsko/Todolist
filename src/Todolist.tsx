import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import {DeleteOutlineRounded} from '@material-ui/icons';
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
            <ListItem   key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                <Checkbox
                     color={'default'}
                    onChange={changeTaskStatus}
                    // type={'checkbox'}
                    checked={t.isDone}
                />
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}><DeleteOutlineRounded/></IconButton>
            </ListItem>
        );
    };

    const tasksList = props.tasks.length
        ? <List  >{props.tasks.map(getTasksListItem)}</List>
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
        <div >
            <Typography variant={'h5'} align={'center'}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <Button variant={'text'} onClick={removeTodoList}>&#128169;</Button>
            </Typography>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            {tasksList}
            <div>
                <ButtonGroup style={{display:'flex',justifyContent:"space-around"}} disableElevation  variant='contained' size={'small'} >
                <Button
                    style={{marginRight:"3px",borderRadius:'10px'}}
                    color={props.filter === 'all' ? 'primary' : 'secondary'}
                    onClick={handlerCreator('all')}
                >All
                </Button>
                <Button
                    style={{marginRight:"3px",borderRadius:'10px'}}
                    color={props.filter === 'active' ? 'primary' : 'secondary'}
                    onClick={handlerCreator('active')}
                >Active
                </Button>
                <Button
                    style={{marginRight:"3px",borderRadius:'10px'}}
                    color={props.filter === 'completed' ? 'primary' : 'secondary'}
                    onClick={handlerCreator('completed')}
                >Completed
                </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoList;