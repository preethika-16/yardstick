import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import '../styles/admin.css'

export default function Admin() {
  const navigate=useNavigate()
  const [user,setUser]=useState(null)
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [addNewNote,setAddNewNote]=useState(false)
  const [form, setForm] = useState({ title: "", body: "" });
  const [member, setMember] = useState({ email: "", password: "" });
  const [update,setUpdate]=useState(false)
  const fetchNotes = async () => {
    try {
      let token=localStorage.getItem("token")
    let res=await axios.get("https://saasnotes.onrender.com/notes/",
        {
            headers:{
                Authorization:`Bearer ${token}`
            },
                body:{
                   user
                }
        }
            )
            console.log(res.data)
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    let userData=JSON.parse(localStorage.getItem("user"))
    console.log(userData)
    setUser(userData)
    fetchNotes();
  }, []);

  const handleEditClick = (note) => {
    setEditingNote(note._id);
    setForm({ title: note.title, body: note.body });
  };
const handleDelete=async(note)=>{
    let id=note._id
     let token=localStorage.getItem("token")
     try {
        await axios.delete(`https://saasnotes.onrender.com/notes/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      alert("Note Delete Sucessful")
      fetchNotes()
     } catch (error) {
        console.log(error)
     }    
}

  const handleUpdate = async (id) => {
    try {
        let token=localStorage.getItem("token")
      await axios.put(`https://saasnotes.onrender.com/notes/${id}`, form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  
  const handleAddMember = async () => {
    try {
      await axios.post("https://saasnotes.onrender.com/members", member);
      setMember({ email: "", password: "" });
      alert("Member added successfully");
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }
    const handleAddNote=async(e)=>{
        e.preventDefault()
        try {
            let token=localStorage.getItem("token")
            if(!token)return console.log("token not present")
            let res=await axios.post("https://saasnotes.onrender.com/notes/",form,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log(res.data)
            setForm({ title: "", body: "" })
            setAddNewNote(false)
            fetchNotes()
        } catch (error) {
          if(error.status==403){
            navigate(`/upgrade/${user.tenantId}`)
          }
            console.log(error.status)
        }
    }
  return (
    <div className="admin-container">
      <h1 className="heading">Admin Dashboard</h1>

    
      <h2>Notes</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            {editingNote === note._id ? (
              <div>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
                <button onClick={() => handleUpdate(note._id)}>Save</button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <button onClick={() => handleEditClick(note)}>Edit</button>
                <button onClick={(e) => {
                    e.target.disabled = true
                    handleDelete(note)
                    }}>Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      
      <h2>Add Member</h2>
      <div className="member-form">
        <input
          type="email"
          placeholder="Email"
          value={member.email}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={member.password}
          onChange={(e) => setMember({ ...member, password: e.target.value })}
        />
        <button onClick={handleAddMember}>Add Member</button>
      </div>
      {
                addNewNote && <div className="new-note-container">
                  
                        <input 
                            type="text" 
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter Title"
                        />
                        <input 
                            type="text" 
                            name="body"
                            value={form.body}
                            onChange={handleChange}
                            placeholder="Enter Messaege"
                        />
                        <button type="submit" onClick={handleAddNote}>Add</button>
                  
                </div>
            }
            <button onClick={()=>setAddNewNote(!addNewNote)}>
                {addNewNote==true ? "Cancle":"Add New note"}
            </button>

      
    </div>
  );
}


