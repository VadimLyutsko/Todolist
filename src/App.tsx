import React, {useState} from 'react';
import {filterType, TodoList} from './Todolist';
import styles from './App.module.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);

    const addTasks = (newTitle: string) => {
        newTitle && setTasks([{id: 5, title: newTitle, isDone: false}, ...tasks]);
    };



    const [filteredTaskId, setFilteredTask] = useState<filterType>('All');


    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(item => item.id !== taskId));
    };

    const getFilteredTasks = () => {

        switch (filteredTaskId) {
            case 'Active':
                return tasks.filter(item => !item.isDone);
            case 'Completed':
                return tasks.filter(item => item.isDone);
        }
        return tasks;
    };

    const changeFilter = (filter: filterType) => {
        setFilteredTask(filter);

    };

    return (
        <div className={styles.App}>

            <TodoList
                addTasks={addTasks}
                tasks={getFilteredTasks()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                title="What to learn"
            />

        </div>
    );
};

export default App;
