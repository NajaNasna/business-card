import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ForgotPass() {

    const params = useParams()
    const[email,setEmail] = useState('')
    const emailInput = useRef(null)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response= await fetch('http://127.0.0.1:5000/api/forgot-password',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email:email})
  })

 
//   .then((result)=>result.json())
//   .then((data)=>{
//     console.log(data)
//     alert(data.status)
//   })

const json = await response.json()
  console.log(json)

//   if(json.status){
//     alert(json.status)
//   }



    }

    useEffect(()=>{
        emailInput.current.focus()
    },[])

  return (
    <div className=''>
        <div className="container">
            <div className="row d-flex justify-content-center align-item-center bg-secondary my-5 py-5">
                <h2 className='text-center'>Forgot Password</h2>
                <div className="col-md-6 col-12">

                    <form action=""  onSubmit={handleSubmit}>
                        <label className='mb-2 text-light'>Email address</label> <br />
                        <input type="text" className='mb-4 w-100' value={email} onChange={(e)=>setEmail(e.target.value)}
                         placeholder='Enter email' ref={emailInput} /> <br />
                        <div className='text-center'>
                        <button className='btn btn-primary w-25'>Submit</button>
                        </div>
                        <Link to={'/signup'}>Sign Up</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPass