import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  // const [keyCount, setkeyCount] = useState(0);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
  let todoString = localStorage.getItem("todos");
  if(todoString)
  {
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }
  },[])
  


  const SaveToLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }
  

  const handleChange = (e) => {
    setTodo(e.target.value);
    // console.log(todo);
  }

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
    // setkeyCount(keyCount+1);
    setTodo("");
    console.log(todos);
    SaveToLS();

  }

  const handleEdit = (e,id) => {
    let edit = todos.filter((item)=>{
      return item.id == id;
    });
    setTodo(edit[0].todo);
    let newTodos = todos.filter((item)=>{
      return item.id!=id;
    });
    setTodos(newTodos);
    SaveToLS();
  }

  //WILL MAKE A CONFIRM FUNC BEFORE DELETING TASK
  const handleDelete = (e, id) => {
    // console.log(index); 
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SaveToLS();
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    })
    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(index);
    SaveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-4 bg-violet-100 rounded-xl min-h-screen xl:w-1/2">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage Your Task At One Place </h1>
        <div className='addTodo my-5 flex flex-col gap-3'>
          <h2 className='font-bold text-2xl'>Add a Todo</h2>
          <div className='flex my-4'>
          <input onChange={handleChange} value={todo} type="text " className='w-full py-2 rounded-md px-4' />
          <button onClick={handleAdd} disabled={todo.length<=2} className='bg-violet-800 hover:bg-violet-900 py-1 px-3 rounded-lg text-white mx-2 cursor-pointer'>Add</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-4'></div>
        <h2 className='font-bold text-2xl my-2'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-4'> No Todos To Display...</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-auto mt-4 xl:mx-2">
              <div className='flex gap-6 w-3/4'>
                <input className='size-5' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through md:text-lg w-full" : "md:text-lg w-full"}> {item.todo}</div>
              </div>   
              {/* <div>IJ</div> */}
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-900 py-1 px-3 rounded-md text-white md:text-xl'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-900 py-1 px-3 rounded-md text-white mx-3 md:text-xl'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
