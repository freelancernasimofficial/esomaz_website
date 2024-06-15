import SubmitButton from "@/components/button/SubmitButton";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RedirectingMessage from "./RedirectingMessage";
import loginAction from "@/actions/auth/loginAction";
type Props = {};

export default async function page({}: Props) {
  const error = cookies().get("error")?.value;
  const success = cookies().get("success")?.value;

  return (
    <div className='p-3 w-screen h-screen flex items-center flex-col justify-center'>
      <div className='text-center shrink-0 w-12 h-12 mx-auto mb-4'>
        <Image
          className='w-full h-full'
          src='/images/logo/logo-icon.png'
          height={80}
          width={80}
          alt='logo'
        />
      </div>
      <div className='max-w-screen-sm2 w-full  mx-auto bg-white rounded-lg p-6 '>
        <h2 className='font-bold '>eSomaz Login</h2>
        <form action={loginAction} className='mt-4'>
          <input
            name='email'
            type='text'
            placeholder='Enter Email or Username'
            className='block w-full mb-4'
          />
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            className='block w-full mb-4'
          />
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <input id='remember' className='mr-2 w-4 h-4' type='checkbox' />{" "}
              <label htmlFor='remember'>Remember Me</label>
            </div>
            <Link
              href='/forgot_password'
              className='text-primary-main font-medium'
            >
              Forgot Password?
            </Link>
          </div>
          {error && <div className='errorCard mb-3'>{error}</div>}
          {success && (
            <RedirectingMessage message='Login Success. Redirecting...' />
          )}
          <SubmitButton className='btn btn-primary w-full' title='Sign In' />
          <div className='mt-3 flex justify-between items-center'>
            <div className=' font-medium'>Need an account?</div>
            <div>
              <Link className=' font-medium text-primary-main' href='/register'>
                Register Now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
