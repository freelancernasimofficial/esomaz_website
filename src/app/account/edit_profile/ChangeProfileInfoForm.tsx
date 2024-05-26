import getCountriesAction from "@/actions/getCountriesAction";
import {
  changeProfileInfoAction,
  getUserInformations,
} from "@/actions/userActions";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import React from "react";

type Props = {};

export default async function ChangeProfileInfoForm({}: Props) {
  const currentUser = await auth();
  //@ts-ignore
  const userInfos = await getUserInformations(currentUser?.id);
  const countries = await getCountriesAction();
  const error = CookieStore.getState("profileError");
  const success = CookieStore.getState("profileSuccess");

  return (
    <form action={changeProfileInfoAction}>
      <select
        defaultValue={userInfos.gender}
        name='gender'
        id='gender'
        className='mb-4 block w-full'
      >
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Other'>Other</option>
      </select>
      <textarea
        defaultValue={userInfos.shortBio}
        className='w-full block mb-4'
        placeholder='Short Biography'
        name='shortBio'
        id=''
        cols={30}
        rows={5}
      ></textarea>

      <select
        name='countryId'
        defaultValue={userInfos?.countryId ? userInfos?.countryId : 18}
        id='countryId'
        className='mb-4 block w-full'
      >
        {countries?.map((country: any) => {
          return (
            <option key={country?.iso3} value={country?.id}>
              {country?.name}
            </option>
          );
        })}
      </select>

      <input
        defaultValue={userInfos.city}
        name='city'
        placeholder='City'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={userInfos.state}
        name='state'
        placeholder='State or Division'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={userInfos.address}
        name='address'
        placeholder='Address'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={userInfos.postalCode}
        name='postalCode'
        placeholder='Post Office Code'
        type='text'
        className='w-full block mb-4'
      />

      <input
        defaultValue={userInfos.workDesignation}
        name='workDesignation'
        placeholder='Job Designation'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={userInfos.workingCompany}
        name='workingCompany'
        placeholder='Job Company Name'
        type='text'
        className='w-full block mb-4'
      />

      <input
        defaultValue={userInfos.studyLevel}
        name='studyLevel'
        placeholder='What are you studying?'
        type='text'
        className='w-full block mb-4'
      />

      <input
        defaultValue={userInfos.instituteName}
        name='instituteName'
        placeholder='Institute Name'
        type='text'
        className='w-full block mb-4'
      />

      <textarea
        defaultValue={userInfos.skills}
        className='w-full block mb-4'
        placeholder='Write your basic skills separated by comma (,)'
        name='skills'
        id=''
        cols={30}
        rows={5}
      ></textarea>

      <div className='mb-4 w-full'>
        <h1 className=' font-medium mb-3'>Date of Birth</h1>
        <div className='flex items-center justify-between'>
          <select
            defaultValue={userInfos?.date ? userInfos.date : 1}
            name='date'
            id='date'
          >
            {[...Array(31)].map((item: any, index: number) => {
              return (
                <option key={index.toString()} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
          </select>
          <select
            defaultValue={userInfos?.month ? userInfos.month : 1}
            name='month'
            id='month'
          >
            {[...Array(12)].map((item: any, index: number) => {
              return (
                <option key={index.toString()} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
          </select>
          <select
            defaultValue={userInfos?.year ? userInfos.year : 1970}
            name='year'
            id='year'
          >
            {[...Array(90)].map((item: any, index: number) => {
              return (
                <option key={index.toString()} value={2031 - (index + 1)}>
                  {2031 - (index + 1)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {error && <div className='errorCard'>{error}</div>}
      {success && <div className='successCard'>{success}</div>}
      <SubmitButton title='Update' className='btn btn-primary w-full' />
    </form>
  );
}
