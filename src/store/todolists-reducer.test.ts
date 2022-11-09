import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from './todolists-reducer';


test('correct todolist should be removed', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ];
    //
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1));
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState).toEqual([{id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}]);
    expect(endState).not.toBe(startState);
});


test('correct todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ];
    //
    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle, v1()));
    //
    expect(endState.length).toBe(3);
    expect(endState[2].todoListTitle).toBe(newTodolistTitle);
    expect(endState).not.toBe([
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ]);

});


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'completed';

    const startState: Array<TodoListType> = [
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});


test('correct title of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let NewTodolistTitle: string = 'NewTodolistTitle';

    const startState: Array<TodoListType> = [
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(NewTodolistTitle,todolistId2));

    const SecondEndState = todolistsReducer(startState,ChangeTodoListTitleAC('NewTodolistTitle2',todolistId1) );

    expect(endState[0].filter).toBe('all');
    expect(endState[1].todoListTitle).toBe('NewTodolistTitle');
    expect(endState[0].todoListTitle).not.toBe('NewTodolistTitle');
    expect(SecondEndState[0].todoListTitle).toBe('NewTodolistTitle2');

});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, todoListTitle: 'What to learn', filter: 'all'},
        {id: todolistId2, todoListTitle: 'What to buy', filter: 'all'}
    ];

    const SecondEndState = todolistsReducer(startState, ChangeTodoListTitleAC('NewTodolistTitle2',todolistId1));

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle,todolistId2));

    expect(endState[0].todoListTitle).toBe('What to learn');
    expect(endState[1].todoListTitle).toBe(newTodolistTitle);
    expect(SecondEndState[0].todoListTitle).toBe('NewTodolistTitle2');
});
