import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

const AuthPage = () => {
	const [login, setLogin] = useState(true);

	return (
		<div className='flex flex-col h-screen justify-center'>
			{login ? <LoginForm /> : <RegisterForm />}
			<div className='flex gap-2 justify-center'>
				<p className='text-md font-medium text-center text-gray-700'>
					{login ? "Don't have an account?" : 'Already have an account?'}
				</p>
				<button
					onClick={() => setLogin(prevState => !prevState)}
					className='font-medium text-purple-600 hover:underline'>
					{login ? 'Sign up!' : 'Sign in!'}
				</button>
			</div>
		</div>
	);
};

export default AuthPage;

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})

    if (session) {
        return {
            redirect: {destination: '/profile'}
        }
    }

    return {
        props: {}
    }
}