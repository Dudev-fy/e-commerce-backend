import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;
    req.body.id = id;
    req.body.email = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['token expired or invalid'],
    });
  }
};
