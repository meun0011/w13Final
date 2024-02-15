import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className="p-10 border w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-lg mt-32 bg-gradient-to-r bg-sky-900" >
      <div className="text-3xl mb-5 text-[#FFFF]">Login with Password</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full  
        lg:w-12/12 mx-auto">
          <div className="label ">
            <span className="label-text"></span>
          </div>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full mx-auto "
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
            type="password"
            placeholder="password"
            className="input input-bordered w-full mx-auto"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>

          <button type="submit" className="btn  bg-green-600 mt-7">Login</button>
          <Link type="submit" className='btn bg-cyan-500 mt-2' to="/register">register</Link>
      </form>
    </div>
  );
}
