import React, { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginForm = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const router = useRouter()

	const submitHandler = async e => {
		e.preventDefault();

		const password = passwordRef.current.value;
		const email = emailRef.current.value;

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password
		})
		
		if (result.ok) {
			router.replace('/profile')
		}
	};

	return (
		<div className='relative flex flex-col justify-center min-h-[300px] overflow-hidden'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h1 className='text-3xl font-semibold text-center text-purple-700 underline'>
					Sign in
				</h1>
				<form className='mt-6' onSubmit={submitHandler}>
					<div className='mb-2'>
						<label
							htmlFor='email'
							className='block text-sm font-semibold text-gray-800'>
							Email
						</label>
						<input
							ref={emailRef}
							type='email'
							id='email'
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
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
