import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title:string
    tasks: taskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: filterType) => void
    addTasks:(newTitle:string)=>void
}

type taskType = {
    id: number
    title: string
    isDone: boolean
}
export type filterType = 'All' | 'Active' | 'Completed'
export const TodoList: React.FC<PropsType> = ({tasks, removeTask, changeFilter, title,addTasks}) => {


    const[newTitle, setNewTitle] = useState<string>('')

    const onClickInputHandler = (el:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(el.currentTarget.value)
    }

    const onClickButtonHandler = ()=>{
        addTasks(newTitle)
        setNewTitle('')
    }

    return (

        <div>

            <h2> {title}</h2>

            <input value={newTitle} onChange={onClickInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>

            <ul>
                {tasks.map(item =>
                    <li key={item.id}><input type="checkbox" checked={item.isDone}/>
                        <button onClick={() => {
                            removeTask(item.id);
                        }}>x
                        </button>
                        {item.title}

                    </li>
                )}

            </ul>

            <button onClick={() => {
                changeFilter('All');
            }}>All
            </button>
            <button onClick={() => {
                changeFilter('Active');
            }}>Active
            </button>
            <button onClick={() => {
                changeFilter('Completed');
            }}>Completed
            </button>
        </div>
    );
};