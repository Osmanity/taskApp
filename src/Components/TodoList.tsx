import React from 'react'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import "./styles.css"
import { Droppable } from 'react-beautiful-dnd'

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    complatedTodos: Todo[];
    setComplatedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, complatedTodos, setComplatedTodos }) => {
    return (
        // <div className='todos'>
        //     {todos.map((todo) => (
        //         <SingleTodo
        //             todo={todo}
        //             key={todo.id}
        //             todos={todos}
        //             setTodos={setTodos} />
        //     ))}
        // </div>

        <div className="container">
            <Droppable droppableId='TodosList'>

                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">Active Tasks</span>
                            {todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>


            <Droppable droppableId='TodosListComplated'>

                {
                    (provided, snapshot) => (
                        <div className={`todos_complate ${snapshot.isDraggingOver ? 'dragcomplate' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        // {...provided.droppableProps}

                        >
                            <span className="todos__heading">Complated Tasks</span>
                            {complatedTodos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={complatedTodos}
                                    setTodos={setComplatedTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>

            {/* 
            <div className="todos_complate">
                <span className="todos__heading">Complated Tasks</span>
                {todos.map((todo) => (
                    <SingleTodo
                        todo={todo}
                        key={todo.id}
                        todos={todos}
                        setTodos={setTodos} />
                ))}
            </div> */}
        </div>
    )
}

export default TodoList