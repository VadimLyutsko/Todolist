import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [nameButton, setNameButton] = useState<FilterValuesType>('all');

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Title is requred');
        }

    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter('all');
        setNameButton('all');
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active');
        setNameButton('active');
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed');
        setNameButton('completed');
    };

    const onClickHandler = (taskID: string) => {
        props.removeTask(taskID);
    };

    const changeIsDoneHandler = (id: string, checked: boolean) => {
        props.changeIsDone(id, checked);
    };

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <ul>
            {
                props.tasks.map(t => {

                    // const onClickHandler = () => props.removeTask(t.id)

                    // const changeIsDoneHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                    //     props.changeIsDone(t.id,event.currentTarget.checked)
                    // }

                    return <li className={t.isDone ? styles.isDone : ''} key={t.id}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={() => onClickHandler(t.id)}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button className={nameButton === 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={nameButton === 'active' ? styles.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={nameButton === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>;
}
