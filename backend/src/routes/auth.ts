import { Router } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

const router = Router();
const secret = 'your_jwt_secret';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;