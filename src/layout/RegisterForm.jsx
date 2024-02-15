import axios from 'axios'
import {useState} from "react";
import { Link } from 'react-router-dom'


export default function RegisterForm() {
  const [input, setInput] = useState({
    name: '',
    username : '', 
    password : '',
    confirmPassword : '',
    email : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="p-10 border w-full md:w-3/3 lg:w-3/ xl:w-1/3 mx-auto rounded-lg mt-32 bg-gradient-to-r bg-sky-900">
      <div className="text-3xl mb-5">Create your Lazada Account</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
      <label className="form-control w-full ">
          <div className="label  mx-auto">
            <span className="label-text"></span>
          </div>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered w-full lg:w-12/12 mx-auto"
            name="name"
            value={input.name}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full lg:w-12/12 mx-auto">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full lg:w-12/12 mx-auto"
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full lg:w-12/12 mx-auto">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full lg:w-12/12 mx-auto"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full lg:w-12/12 mx-auto"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full lg:w-12/12 mx-auto"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
          />
        </label>
        
          <button type="submit" className="btn  btn-info mt-7">Sign Up</button>

          <button type="reset" className="btn  btn-warning mt-2">Reset</button>
         <Link type="submit" className='btn bg-cyan-500 mt-2' to="/login">login</Link>
          
        
      </form>
    </div>
  );
}
