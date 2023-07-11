import { useAuthContext } from '@/context/authContext';
import React, { useState } from 'react'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleRegister } = useAuthContext();

    const handelchange = (e) => {
        console.log(e.target.value, e.target.name);
        switch (e.target.name) {
            case "name":
                setName(e.target.value)
                break;
             case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                break;
        }
        console.log(name);
    }

  return (
<div className="min-h-screen bg-gray-100 p-0 sm:p-12">
  <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
    <h1 className="text-2xl font-bold mb-8">Enter Form</h1>
    <form id="form"  onSubmit={(e)=>{handleRegister(e,name, email, password)}}>
      <div className="relative z-0 w-full mb-5">
        <input
          type="text"
            name="name"
            placeholder='name'
          required
          onChange={handelchange}
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        />
        <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"></label>
        <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
      </div>

      <div className="relative z-0 w-full mb-5">
        <input
        type="email"
        name="email"
        placeholder='Enter email address'
          onChange={handelchange}
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        />
        <label htmlFor="email" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"></label>
        <span className="text-sm text-red-600 hidden" id="error">Email address is required</span>
      </div>

      <div className="relative z-0 w-full mb-5">
        <input
          type="password"
                          name="password"
                          placeholder='password'
          onChange={handelchange}
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
        />
        <label htmlFor="password" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"></label>
        <span className="text-sm text-red-600 hidden" id="error">Password is required</span>
      </div>
      <button
                      id="button"
                      type='submit'
        className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-900 hover:bg-red-600 hover:shadow-lg focus:outline-none"
      >
        Register
      </button>
    </form>
  </div>
</div>
  )
}
