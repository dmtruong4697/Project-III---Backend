import UserModel from '../models/User.js';
import { secret } from '../config/auth.config.js';
import Jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  Jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }

    req.id = decoded.id;
    req.role = decoded.role;
    next(); 
  });
};

export {verifyToken};
