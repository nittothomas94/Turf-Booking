const jwt = require('jsonwebtoken');

const checkToken = roles => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;

      //checking no there "token"
      if (!bearerToken) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: No token provided' });
      }

      const token = bearerToken.split(' ')[1];

      //validating token with the same key which used to generate the token
      // isVAlid containes role and _id etc
      const isValid = jwt.verify(token, process.env.SECRET_KEY);
      console.log(isValid);

      //role checking
      if (!roles.includes(isValid.role)) {
        return res.status(401).json({ message: 'not allow to use this' });
      }

      next();
    } catch (e) {
      return res.status(500).json({ message: 'You are not Auth' });
    }
  };
};

module.exports = checkToken;
