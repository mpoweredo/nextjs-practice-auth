import { getSession, signOut } from 'next-auth/react';
import React from 'react';

const ProfilePage = ({ session }) => {
    const logoutHandler = () => {
        signOut()
    }
    
	return (
		<div className='flex flex-col gap-2 items-center'>
			<h1 className='font-bold text-3xl'>page profile</h1>
			<h1 className='font-semibold text-xl'>
				your email: {session.user.email}
			</h1>
			<h1 className='font-regular text-lg'>
				your name: {session.user.name}{' '}
			</h1>
				<button onClick={logoutHandler} className='mx-auto bg-purple-600 w-28 h-10 rounded-sm font-semibold text-white'>
					Log out
				</button>
		</div>
	);
};

export default ProfilePage;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
