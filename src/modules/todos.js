const todoActionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
};

let nextId = 1;
export const todoActions = {
  addTodo: (text) => ({
    type: todoActionTypes.ADD_TODO,
    todo: {
      id: nextId++,
      text,
    },
  }),
  toggleTodo: (id) => ({
    type: todoActionTypes.TOGGLE_TODO,
    id,
  }),
};

const initialState = [
  /* 
  {
    id:1,
    text: 'text',
    done: false
  }
  */
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case todoActionTypes.ADD_TODO:
      return state.concat(action.todo);
    case todoActionTypes.TOGGLE_TODO:
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    default:
      return state;
  }
}
