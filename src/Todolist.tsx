import React from 'react';
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: filterValue) => void
}
export type filterValue = 'All' | 'Active' | 'Completed';

export const Todolist: React.FC<PropsType> = ({title, tasks, removeTask, changeFilter}) => {
        return <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(item => {
                    return (
                        <li key={item.id}>
                            <button onClick={() => {
                                removeTask(item.id);
                            }}>x
                            </button>
                            <input type="checkbox" checked={item.isDone}/> <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => {changeFilter('All')}}>All</button>
                <button onClick={() => {changeFilter('Active')}}>Active</button>
                <button onClick={() => {changeFilter('Completed')}}>Completed</button>
            </div>
        </div>;
    }

