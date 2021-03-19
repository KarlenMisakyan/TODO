//imports
import React, { useEffect, useState } from 'react';


//react-icons
import { ImArrowUp } from 'react-icons/im';
//import { BiCheckCircle } from 'react-icons/bi';
//import { RiDeleteBinLine } from 'react-icons/ri';
import { ImArrowDown } from 'react-icons/im';

//material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function ToDoList() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState([...todos]);
  const [status, setStatus] = useState("all");

  const handlerInputText = (e) => {
    if(e.key === "Enter") {
      if(e.target.value === '') {
        alert('Write some task...');
      } else {
        e.preventDefault();
        handlerSubmitTodo(e);
        setInputText('');
        e.target.value = '';
      }
    }
    else {
      setInputText(e.target.value);
    }
  };

  const handlerSubmitTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos, { text: inputText, completed: false, id: todoId, date: new Date().toLocaleString()} 
    ]);
    setTodoId(todoId + 1);
    setStatus("all");
    console.log(1);
  };

  const handlerDeleteItem = (e, index) => {
    e.preventDefault();
    let updatedTodos = [...todos];
    updatedTodos = updatedTodos.filter( el => el.id !== index);
    setTodos([...updatedTodos]);
  };

  const handlerCheckingCheckBox = (e, index) => {
    let updatedTodos = [...todos];
    const completedTodo = updatedTodos.find(e => e.id === index);
    completedTodo.completed = e.target.checked;
    setTodos([...updatedTodos]);
  };

  const handlerButtonStatusChange = e => {
    setStatus(e.target.value);
    console.log(status);
  };

  const handlerFilterTodos = () => {
    // console.log(status);
    if (status === "all") {
      console.log("all",[...todos])
      setFilteredTodos([...todos]);
    } else if (status === "done") {
      console.log("done")
      setFilteredTodos([...todos.filter(e => e.completed === true)]);
    } else if (status === "undone") {
      setFilteredTodos([...todos.filter(e => e.completed === false)]);
    }
  };

  useEffect(() => {
    handlerFilterTodos();
  }, [todos,status]);
  
  return (
    <section className="main-section">
      <h1>ToDo</h1>
      <div className="input">
        <TextField onChange={ handlerInputText } onKeyPress={ handlerInputText } type="text" autoComplete= "off" className="main-input" id="outlined-basic" label="I want to..." variant="outlined"/>
      </div>
      <div className="wrapper">
        <div className="selection-bar">
          <button className="button all-button" onClick={() =>  setStatus("all") } value="all" >All</button>
          <button className="button done-button" onClick={() => setStatus("done")} value="done">Done</button>
          <button className="button undone-button" onClick={() => setStatus("undone")} value="undone">Undone</button>
        </div>
        <div className="sort">
          <h3>Sort by Date</h3>
          <div className="arrows">
            <Button variant="contained">
              <ImArrowUp className="up-arrow" size="1rem"/>
            </Button>
            <Button variant="contained">
              <ImArrowDown className="down-arrow" size="1rem"/>
            </Button>
          </div>
        </div>
      </div>
      <div className="list">
      <List width="100%">
      { filteredTodos.map((todo) => (
        <ListItem key={todo.id}>
          <ListItemIcon>
            <Checkbox checked={todo.completed} onClick={ (e) => handlerCheckingCheckBox(e, todo.id) }/>
          </ListItemIcon>
          <ListItemText primary={todo.text} />
          <IconButton onClick={ (e) => handlerDeleteItem(e, todo.id) }  edge="end" aria-label="comments">
            <DeleteIcon />
          </IconButton>
        </ListItem>
        )) }
      </List>
      </div>
      <div className="delete-bar">
        <div className="delete-completed">

        </div>

      </div>      
    </section> 
  );
}
 
