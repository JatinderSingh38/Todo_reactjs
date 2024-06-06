//todo
import React, { useState, useEffect } from 'react';
import './styles/login.css';
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/read');
            setTodos(res.data);
            fetchTodos();
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:5000/create', formData);
            setFormData({ name: "", description: "" });
        } catch {
            console.error('Error creating todo:');
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`);
            fetchTodos();
        } catch {
            console.error('Error deleting todo:');
        }
    }

    const handleComplete = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/complete/${id}`)
            fetchTodos();
        } catch {
            console.error('cant complete todo');
        }
    }

    const clearTodo = async () => {
        try {
            await axios.delete(`http://localhost:5000/deleteall`)
        } catch {
            console.error('error in clearing todo');
        }
    }

    return (
        <div className="main-todo">
            <div className="heading">TODO LIST</div>
            <div className="add-todo">
                <div className="by-name">
                    <div className="name-todo">Name</div>
                    <input
                        className="inp-todo"
                        type='text'
                        placeholder="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="description">
                    <div className="d-todo">Description</div>

                    <input
                        className="inp-todo"
                        type='text'
                        placeholder="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <button className="add-todo-btn" onClick={handleSubmit}>Add Todo</button>
            </div>
            <div className="all-tasks" style={{ maxHeight: '350px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {todos.map(todo => (
                    <div className="task" key={todo._id}>
                        {!todo.complete ? (<div className="task1">
                            <div className="name-of-task">{todo.name}</div>
                            <div className="what-to-do">desc:{todo.description}</div>
                        </div>) : (
                            <div className="task1">
                                <div className="name-of-task-complete">{todo.name}</div>
                                <div className="what-to-do">desc:{todo.description}</div>
                            </div>
                        )}
                        <div className="buttons">
                            {todo.complete ? (
                                <button className="completed">Completed</button>
                            ) : (
                                <button className="complete" onClick={() => handleComplete(todo._id)}>Complete</button>
                            )}
                            <button className="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {todos.length ? (<div className="clear">
                <button style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'orange' }} onClick={() => clearTodo()}>CLEAR LIST</button>
            </div>) : (null)}
        </div>
    )
}


export default Login;