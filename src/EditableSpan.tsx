import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => {
        setIsEditMode(true);
    };

    const offEditMode = () => {
        setIsEditMode(false);
        props.changeTitle(title)
    };

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (

        isEditMode ?

            <TextField
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetLocalTitle}
            /> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

