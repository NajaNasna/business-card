import React, { useEffect,useState,useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {

    const textInput = useRef(null)
  const[credentials,setCredentials]=useState({email:"",password:""})
  let navigate = useNavigate()

    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
      }

      const handleLogin=async(e)=>{
        e.preventDefault();
  const response= await fetch('http://127.0.0.1:5000/api/loginUser',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email:credentials.email, password:credentials.password})
  })
  const json = await response.json()
  console.log(json)

  if(!json.success){
    alert("Enter valid credentials")
  }

  if(json.success){
    localStorage.setItem("authToken",json.authToken)
    console.log(localStorage.getItem("authToken"))
    navigate('/')
  }
      }
    
      useEffect(()=>{
       textInput.current.focus() 
      },[])

  return (
    <div>
        <div className="container">
            <h1 className='my-5 text-center fw-bolder'>LOGIN</h1>
      <form onSubmit={handleLogin}>
      
  <div className="form-group mt-5">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
    name='email' value={credentials.email} onChange={onChange} ref={textInput} autoComplete='off'/>
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control " placeholder="Password" name='password'
     value={credentials.password} onChange={onChange}/>
  </div>
  
  <div className='text-center'>
  <button type="submit" className="btn btn-primary mt-3 w-50 mx-auto">Login</button>
  </div>
  <div className='mt-3'>
  <Link to={'/signup'} className=' mt-3 mx-5'>I'm a new User</Link>
  <Link to={'/forgot-pass'} className=' mt-3 mx-5'>Forgot Password </Link>
  </div>

</form>
      </div>
    </div>
  )
}

export default Login