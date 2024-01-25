import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className=' max-w-screen-sm2 mx-auto bg-white rounded-lg p-6 mt-20'>
        <h2 className='font-bold text-xl'>eSomaz Login</h2>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Enter Email or Username'
            className='block w-full mb-4'
          />
          <input
            type='text'
            placeholder='Enter Password'
            className='block w-full mb-4'
          />
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <input id='remember' className='mr-2 w-4 h-4' type='checkbox' />{" "}
              <label htmlFor='remember'>Remember Me</label>
            </div>
            <Link href='/forgot_password' className='text-blue-700 font-medium'>
              Forgot Password?
            </Link>
          </div>
          <button className='btn btn-primary w-full'>Sign In</button>
          <div className='mt-3 flex justify-between items-center'>
            <div className='text-sm2 font-medium'>Need an account?</div>
            <div>
              <Link
                className='text-sm2 font-medium text-blue-700'
                href='/register'
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
