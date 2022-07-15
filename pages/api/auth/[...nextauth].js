import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import { connectToDatabase } from '../../../helpers/db-utils';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const { password, email } = credentials;

				const client = await connectToDatabase();

				const userCollection = client.db().collection('users');
				const user = await userCollection.findOne({
					email: email,
				});

                console.log(user)

				if (!user) {
					client.close();
					throw new Error('No user found!');
				}

				const isValid = await verifyPassword(password, user.password);

				if (!isValid) {
					client.close();
					throw new Error('Couldnt log you!');
				}
				client.close();
				return { email: user.email, name: user.name };
			},
		}),
	],
});
