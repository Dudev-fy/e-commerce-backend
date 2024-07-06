import Customer from '../models/Customer';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

class TokenController {
  async storeToken(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          errors: ['Email required'],
        });
      }

      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        res.status(401).json({
          errors: ['User does not exist'],
        });
      }

      const isMatch = await bcryptjs.compare(password, customer.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const { id } = customer;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.json({ token });
    } catch (error) {
      console.error('Error obtaining token:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new TokenController();
