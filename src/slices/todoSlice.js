import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    deleteTodo: (state, action) => {
      // get all item from local storage
      const todoList = window.localStorage.getItem("todoList");
      // if we have any item
      if (todoList) {
        // parse todoList
        const todoListArr = JSON.parse(todoList);
        // check which one we will delete
        todoListArr.forEach((todo, index) => {
          // in our action.payload we gonna past id
          if (todo.id === action.payload) {
            // we gonna to splice one item by it index in for loop
            todoListArr.splice(index, 1);
          }
        });
        // after deleting we gonna past in locale storage new array
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        // updating initial state. past inside actual todoitemarray
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      // get all item from local storage
      const todoList = window.localStorage.getItem("todoList");
      // if we have any item
      if (todoList) {
        // parse todoList
        const todoListArr = JSON.parse(todoList);
        // check which one we will update
        todoListArr.forEach((todo) => {
          // in our action.payload wiil be title, status and id so we nedd to compare todo.id (from loop) with action.payload.id
          if (todo.id === action.payload.id) {
            // update title and status
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        // after updating we gonna past in locale storage new array
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
         // updating initial state. past inside actual todoitemarray
         state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      // update state filterstatus accordint to action.paylod. whatever we pass in payload will be new state filterstatus
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;

// 1:09:00
