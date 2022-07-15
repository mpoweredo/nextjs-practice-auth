import React, { useRef } from 'react';

const RegisterForm = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();

	const submitHandler = async e => {
		e.preventDefault();

		const password = passwordRef.current.value;
		const email = emailRef.current.value;
		const name = nameRef.current.value;


        const result = await fetch('/api/auth/SignUp', {
            method: 'POST',
            body: JSON.stringify({email, password, name}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await result.json()

        console.log(data)
	};

	return (
		<div className='relative flex flex-col justify-center min-h-[300px] overflow-hidden'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h1 className='text-3xl font-semibold text-center text-purple-700 underline'>
					Sign up
				</h1>
				<form className='mt-6' onSubmit={submitHandler}>
					<div className='mb-2'>
						<label
							htmlFor='name'
							className='block text-sm font-semibold text-gray-800'>
							Name
						</label>
						<input
							ref={nameRef}
							id='name'
							type='text'
							className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>
					<div className='mb-2'>
						<label
							htmlFor='email'
							className='block text-sm font-semibold text-gray-800'>
							Email
						</label>
						<input
							ref={emailRef}
							id='email'
							type='email'
							className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>
					<div className='mb-2'>
						<label
							htmlFor='password'
							className='block text-sm font-semibold text-gray-800'>
							Password
						</label>
						<input
							ref={passwordRef}
							id='password'
							type='password'
							className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>
					<div className='mt-6'>
						<button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
