import { userController } from '../user'
import jwt from 'jsonwebtoken'

export const authController = {
  login: async (req: any, res: any) => {
    try {
      const { email, password } = req.body
      const user = await userController.getUser(email, password)
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' })
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY || 'null',
        {
          expiresIn: '1d',
        }
      )
      return res.status(200).json({ token })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to login. Please try again later.' })
    }
  },
}
