import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import '../styles/user.css'
function User() {
    const [user,setUser]=useState(null)
    const [notes,setNotes]=useState([])
    const [editingNote, setEditingNote] = useState(null);
    const [addNewNote,setAddNewNote]=useState(false)
    const [form,setForm]=useState({body:"",title:""})
    useEffect(()=>{
        let userData=JSON.parse(localStorage.getItem("user"))
        console.log(userData)
        setUser(userData)
        getNotes()
    },[])

    const getNotes=useCallback(async()=>{
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
            setNotes(res.data)
        } catch (error) {
            console.log(error)
        }
    },[])
    
     const handleEditClick = (note) => {
        setEditingNote(note._id);
        setForm({ title: note.title, body: note.body });
    };

    const handleUpdate = async (id) => {
        try {
            let token=localStorage.getItem("token")
        await axios.put(`https://saasnotes.onrender.com/notes/${id}`, form,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setEditingNote(null);
        getNotes();
        } catch (err) {
        console.error("Error updating note:", err);
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
            getNotes()
        } catch (error) {
            console.log(error)
        }
    }
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
        getNotes()
        } catch (error) {
            console.log(error)
        }    
}
    return (  
        <>
            {user && 
                <div className="user-details">
                    <h1>Profile</h1>
                    <br />
                    <h3>Email: {user.email}</h3>
                    <h3>Role:  {user.role}</h3>
                    <h3>TenantId: {user.tenantId}</h3>
                </div>
            }
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
                            }}>Delete</button>


                    </div>
                    )}
                </div>
                ))}
      </div>
            {
                addNewNote && <div className="new-note-container">
                        <input 
                            type="text" 
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                        />
                        <input 
                            type="text" 
                            name="body"
                            value={form.body}
                            onChange={handleChange}
                            placeholder="Enter message"
                        />
                        <button type="submit" onClick={handleAddNote}>Add</button>
                </div>
            }
            <div className="btn-container">
                <button onClick={()=>setAddNewNote(!addNewNote)}>
                    {addNewNote==true ? "Cancle":"Add New note"}
                </button>
            </div>
            
        </>
    );
}

export default User;