import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircleOutlineTwoTone} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    };

    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewItem();

    // const errorMessage = error ? <StepLabel error={error} style={{fontWeight: 'bold', color: 'hotpink'}}>Title is required!</StepLabel > : null;

    const addNewItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');
    };

    return (
        <div>
            <TextField
                style={{marginBottom:'20px'}}
                label={'New here'}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                className={error ? 'error' : ''}
                placeholder='Touch me :)'
                error={error}
                helperText={error&&'Title is required!'}
            />
            <IconButton onClick={addNewItem}>
                <AddCircleOutlineTwoTone fontSize={'small'}/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
};

