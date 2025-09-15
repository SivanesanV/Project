import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'


function LoginPopup({ setShowLogin }) {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""

    })
    const onchangeHandler = (event)=>{
        const name= event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogine =async (event)=>{
        event.preventDefault() 
        let newUrl =url;
        if (currState==="Login"){
            newUrl+= "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)

        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogine} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2> {currState} </h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currState === "Login" ? <></> : <input type="text" name='name' value={data.name}  onChange={onchangeHandler} placeholder='Your Name' required />}
                    <input type="email" name='email' value={data.email}  onChange={onchangeHandler} placeholder='Your Email' required />
                    <input name='password' value={data.password}  onChange={onchangeHandler} type="password" placeholder='Password' required />
                </div>
                <button type='submit'> {currState === "Sign Up" ? "Create Acount" : "Login"} </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p>Already hace an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p> }
            </form>
        </div>
    )
}

export default LoginPopup
