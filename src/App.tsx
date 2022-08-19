import React, { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import TodoList from './Components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { idText } from 'typescript';



// function App() {}
const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [complatedTodos, setComplatedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("");
    }
  }

  // console.log(todo);
  console.log(todos);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId
      &&
      destination.index === source.index) return;

    let add,
      active = todos,
      complate = complatedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complate[source.index];
      complate.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else {
      complate.splice(destination.index, 0, add);
    }

    setComplatedTodos(complate);
    setTodos(active);

  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* <span className='heading'> <span className='firstletter'>O</span>smanity </span> */}
        <span className='heading'> <span className='firstletter'>T</span>ask<span className='firstletter'>A</span>pp</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {/* {todos.map((todoCard) => (
        <li>{todoCard.todo}</li>
      ))} */}
        <TodoList todos={todos} setTodos={setTodos} complatedTodos={complatedTodos} setComplatedTodos={setComplatedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
