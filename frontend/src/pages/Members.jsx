import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Member() {
    const {slug}=useParams()
    const [members,setMembers]=useState([])
    useEffect(()=>{
        getMembers()
    },[])

    const getMembers=async()=>{
        let token=localStorage.getItem("token")
        let res=await axios.get(`https://saasnotes.onrender.com/tenants/${slug}/members`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        console.log(res.data)
        setMembers(res.data.members)
    }
    return (  
        <>
        <Navbar/>
        <h2>Members</h2>
            <div 
                className="membercontainr"
                style={{
                    display:"Flex",
                    flexDirection:"column",
                    padding:"10px",
                    backgroundColor:"#a90f0f",
                    gap:"10px"

                }}    
            >
                {members.map((member)=>{
                    return(
                        <div 
                            className="member-container"
                            style={{
                                backgroundColor:"white",
                                padding:"10px",
                                borderRadius:"10px"
                            }}    
                        >
                            <h3>Email:{member?.email}</h3>
                            <h3>Role:{member?.role}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Member;