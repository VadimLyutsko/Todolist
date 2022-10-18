import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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

    const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'hotpink'}}>Title is required!</div> : null;

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
            <input
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                className={error ? 'error' : ''}
                placeholder='Touch me :)'
            />
            <button onClick={addNewItem}>+</button>
            {errorMessage}
        </div>
    );
};

