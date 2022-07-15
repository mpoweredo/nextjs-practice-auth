import { hashPassword, validateEmail, validateName, validatePassword } from "../../../helpers/auth"
import { connectToDatabase } from "../../../helpers/db-utils"

const handler = async (req, res) => {
    if (req.method !== 'POST') return 

    const {email, password, name } = req.body
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isNameValid = validateName(name)

    if (!isEmailValid) {
        res.status(422).json({message: 'It is not an email!'})
        return
    }

    if (!isPasswordValid.isValid) {
        res.status(422).json({message: isPasswordValid.error})
        return
    }

    if (!isNameValid.isValid) {
        res.status(422).json({message: isNameValid.error})
        return
    }

    const client = await connectToDatabase()
    const db = client.db()
    const userExist = await db.collection('users').findOne({email})

    if (userExist) {
        res.status(422).json({message: 'User already exist!'})
        client.close()
        return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        name,
    })

    res.status(200).json({message: 'User created!'})
}

export default handler