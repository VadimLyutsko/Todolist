import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    todoListTitle: string
    filter: FilterValuesType
}
export type TasksStateType = { [todoListId: string]: Array<TaskType> }


function App() {
    // BLL:
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, todoListTitle: 'What to do', filter: 'all'},
        {id: todoListId_2, todoListTitle: 'What to buy', filter: 'completed'},
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'HTML&CSS', isDone: true},
        ],
        [todoListId_2]: [
            {id: v1(), title: '2222&CSS', isDone: true},
            {id: v1(), title: 'Trees', isDone: true},
            {id: v1(), title: 'Grass', isDone: true},
        ]
    });

    const removeTask = (taskId: string, todoListId: string) => {
        const copyTasks = {...tasks};
        copyTasks[todoListId] = copyTasks[todoListId].filter(t => t.id !== taskId);
        setTasks(copyTasks);

        // setTasks({...tasks, [todoListId]:tasks[todoListId].filter(t => t.id !== taskId)})
    };
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    };
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        });
    };


    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, title: title} : t)
        });
    };

    // todolists

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId));
        delete tasks[todoListId];
    };

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t));
    };

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, todoListTitle: title} : t));
    };

    const addToDoList = (title: string) => {
        const newToDoListId: string = v1();
        const newToDoList: TodoListType = {
            id: newToDoListId,
            todoListTitle: title,
            filter: 'all'
        };
        setTodoLists([...todoLists, newToDoList]);
        setTasks({...tasks, [newToDoListId]: []});
    };


    //GUI:
    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = t;
        if (f === 'active') {
            tasksForTodoList = t.filter(t => !t.isDone);
        }
        if (f === 'completed') {
            tasksForTodoList = t.filter(t => t.isDone);
        }
        return tasksForTodoList;
    };


    const todoListComponents = todoLists.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper
                    variant={'outlined'}
                    // elevation={10}
                    style={{width: '270px', padding: '20px'}}>
                    <TodoList

                        todoListId={t.id}
                        filter={t.filter}
                        tasks={getFilteredTasks(tasks[t.id], t.filter)}
                        title={t.todoListTitle}
                        removeTodoList={removeTodoList}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
