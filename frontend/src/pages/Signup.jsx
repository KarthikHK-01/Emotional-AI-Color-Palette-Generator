import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] =useState("");
    const navigate = useNavigate();

    async function handleSignup () {
      try{
        const res = await axios.post("http://localhost:3000/api/signup", {username: name, password: password, confirm_password: confPassword});
        
        alert(res.data.message);
        navigate('/login');
      }catch(err){
        console.log(err);
        alert("Signup failed: " + (err.response?.data?.message || err.message));
      }
    }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      {/* Hero Section */}
      <section
        className="flex-grow relative bg-center bg-no-repeat bg-cover flex items-center justify-center text-center px-4 w-full h-screen m-0 p-0"
        style={{ backgroundImage: "url('https://www.freevector.com/uploads/vector/preview/30339/Abstract_Colorful_Background.jpg')" }}>
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Hero Content */}
        <div className="relative z-10 items-center justify-center bg-gray-50 p-6 rounded-md shadow-md w-1/4 h-1/2">
          <h1 className="text-[35px] font-bold">Sign Up</h1>
          <label>
            <p className="mt-2 text-left text-[20px]">Username</p>
            <input className="block mt-2 w-full focus:outline-blue-500 focus:outline-2 border rounded-md border-gray-500" placeholder="  Enter your name" name="username" onChange={(e) => {setName(e.target.value)}}></input>
          </label>
          <label>
            <p className="mt-4 text-left text-[20px]">Password</p>
            <input className="block mt-2 w-full focus:outline-blue-500 focus:outline-2 border rounded-md border-gray-500" placeholder="  Enter password" name="password" onChange={(e) => {setPassword(e.target.value)}}></input>
          </label>
          <label>
            <p className="mt-4 text-left text-[20px]">Confirm Password</p>
            <input className="block mt-2 w-full focus:outline-blue-500 focus:outline-2 border rounded-md border-gray-500" placeholder="  Confirm password" name="confirm_password" onChange={(e) => {setConfPassword(e.target.value)}}></input>
          </label>
          <button onClick={handleSignup} className="bg-indigo-600 hover:bg-indigo-700 text-gray-50 font-semibold py-3 px-6 rounded-lg mt-6 ">Sign Up</button>
        </div>
      </section>
    </div>
  )
}

export default Signup;
