import React from 'react'
import "./../Style/todo.css"
import { useState,useRef,useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";
import { IoIosDoneAll } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
function Todolist() {
  const  [Todo,setTodo]=useState("")
  const [Todolist,setTodolist]=useState([])
  const [editId,setEditid]=useState(0)
const handleSubmit=(e)=>{
  e.preventDefault();

}



  const addTodo=()=>{
    if(Todo !==''){
    setTodolist([...Todolist,{list :Todo, id:Date.now(), status:false}])
    console.log(Todolist)
    setTodo("")
    }
    if(editId){
      const todoEdit=Todolist.find((Todo)=>Todo.id === editId)
      const updateTodo=Todolist.map((to) =>to.id === todoEdit.id
      ?  (to ={id : to.id, list : Todo})
      : (to ={id : to.id, list : to.list}))
      setTodolist(updateTodo)
      setEditid(0)
      setTodo('')
    }
  }
  const inputref=useRef('null')

useEffect(()=>{
  inputref.current.focus();
})
const onDelete=(id)=>{
  setTodolist(Todolist.filter((to)=> to.id !== id))
}
const onComplete=(id)=>{
let complete=Todolist.map((list)=>{
  if(list.id===id){
    return({...list,status:!list.status})
  }
  return list
})
setTodolist(complete)
}
const onEdit= (id)=>{
const editTodo=Todolist.find((to)=> to.id===id)
setTodo(editTodo.list)
setEditid(editTodo.id)
}

  return (
    <div className='container'>
      <h2>TO-DO LIST</h2>
      <form className='formgroup' onSubmit={handleSubmit}> 
        <input type="text" value={Todo} ref={inputref}  placeholder='Add a new Task' className='form-control' onChange={(event)=>setTodo(event.target.value)}/>
        <button onClick={addTodo}><IoMdAdd />{editId ? 'EDIT' : 'ADD' }</button>
      </form>
      <div className='list'>
        <ul>
          {Todolist.map((to)=>(
            <li className='listitems'>
              <div className='list-item-list' id={to.status ?'list-item' : ''}>{to.list}</div>
            <span>
            <IoIosDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(to.id)}/>
            <MdModeEdit className='list-item-icons'id='edit' title='Edit' onClick={()=>onEdit(to.id)}/>
            <RiDeleteBin6Fill className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelete(to.id)}/>
              </span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todolist
