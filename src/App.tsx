import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    todoListTitle: string
    filter: FilterValuesType
}
type TasksStateType = { [todoListId: string]: Array<TaskType> }


function App() {
    // BLL:
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, todoListTitle: 'What to do', filter: 'all'},
        {id: todoListId_2, todoListTitle: 'What to byu', filter: 'completed'},
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

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t));
    };

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId));
        delete  tasks[todoListId]
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

    const todoListComponents = todoLists.map(t=>{
        return(
            <TodoList
                key={t.id}
                todoListId={t.id}
                tasks={getFilteredTasks(tasks[t.id], t.filter)}
                title={t.todoListTitle}
                filter={t.filter}
                removeTodoList={removeTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
