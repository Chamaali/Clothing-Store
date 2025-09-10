import React from 'react';

function SignupInput({ labelName, labelText, inputType, value, onChange, errMsg }) {
  return (
    <div className='relative flex flex-col'>
      <label
        htmlFor={labelName}
        className='absolute mt-[-10px] ml-2 bg-white font-medium text-sm'
      >
        {labelText}
      </label>
      <input
        type={inputType}
        id={labelName}
        name={labelName}
        value={value}
        className={`${errMsg ? 'border-red-500' : 'py-2'} border focus:outline-none py-2 rounded-md`}
        autoComplete="off"
        onChange={onChange}
      />
      {errMsg && (
        <label
          htmlFor={labelName}
          className='ml-2 text-sm text-red-500 max-w-[380px] border'
        >
          {errMsg}
        </label>
      )}
    </div>
  );
}

export default SignupInput;
