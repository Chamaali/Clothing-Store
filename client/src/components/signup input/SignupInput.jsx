import React, { useState } from 'react';

function SignupInput(props) {
  
  return (
    <div className='relative flex flex-col'>
      <label htmlFor={props.labelName} className='absolute mt-[-10px] ml-2 bg-white font-medium text-sm'>{props.labelText}</label>
      <input type={props.inputType} id={props.labelName} name={props.labelName} value={props.value} className={`${props.errMsg ? 'border-red-500' : 'py-2 '} border focus:outline-none py-2 rounded-md`} autoComplete="off" onChange={props.onChange} />
      {props.errMsg && <label htmlFor={props.labelName} className='ml-2 text-sm text-red-500 max-w-[380px] border '>{props.errMsg}</label>}
    </div>
  );
}

export default SignupInput;
