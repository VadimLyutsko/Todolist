import React, {useState} from 'react';
import './App.css';
import {filterValue,  Todolist} from './Todolist';

const App: React.FC = () => {
    const [tasks, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);
    const removeTask = (taskID: number) => {
        setTask(tasks.filter(item => item.id !== taskID));
    };

    const [filter, srtFilter] = useState("All");

    const getTusksForTodolist = () => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const changeFilter = (filterValue: filterValue) => {
        srtFilter(filterValue)
    };
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                 tasks={getTusksForTodolist()}
                removeTask={removeTask}
                changeFilter={changeFilter}

            />
        </div>
    );
};
export default App;
