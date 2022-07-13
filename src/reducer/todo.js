export const initialTodos = [

];

export const todoActions = {
    ADD: 'ADD', TOGGLE: 'TOGGLE', DELETE: 'DELETE'
}

export const todoReducer = (state, action) => {
    const newTodos = [...state];
    switch (action.type) {
        case todoActions.ADD:
            return [...state, action.newTodo]
        case todoActions.TOGGLE:
            return state.map((todo,index) => {
                if (index === action.index) {
                  return { ...todo, isCompleted: !todo.isCompleted };
                } else {
                  return todo;
                }
              });
        case todoActions.DELETE:
            newTodos.splice(action.index, 1);
            return newTodos
        default:
            return state;
    }
};