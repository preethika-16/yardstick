import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/upgrade.css'
import Navbar from "../components/Navbar";
function Upgrade() {
    const {slug}=useParams()
    console.log(slug)
    const handleCheckout=async()=>{
        try {
            let token=localStorage.getItem("token")
            const res=await axios.post(`https://saasnotes.onrender.com/tenants/${slug}/upgrade`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(resizeBy.data.ok)
        } catch (error) {
            console.log(error)
        }
    }
    return (  
        <>
        <Navbar/>
        <div className="updrade-container">
            <div className="main-container">
                    <p>
                        Welcome to the upgrade
                        <br />
                        More features. More power. More you
                        <br />
                        Upgrade to unlock unlimited notes
                    </p>
                    
                    <div className="btn">
                        <button 
                            onClick={handleCheckout}
                            className="checkout-btn"
                        >
                            Checkout
                        </button> 
                    </div>
                    
            </div>
            <div className="rotate-container">
                <img src="https://media.istockphoto.com/id/1053291038/vector/business-finance-bar-profit-vector-illustration.jpg?s=612x612&w=0&k=20&c=r0axxeuEroKcQO7lhVziB0-AFuRTFfGUfnrfF1euzB4=" alt="" />
            </div>
        </div>
        </>
    );
}

export default Upgrade;