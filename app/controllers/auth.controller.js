import BaseController from './base.controller';
import User from '../models/user';
import Util from '../lib/util';


class AuthController extends BaseController {
  login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        const err = new Error('Username does not match any records.');
        err.status = Util.code.bad;
        return next(err);
      } else if (!user.authenticate(password)) {
        const err = new Error('Incorrect password.');
        err.status = Util.code.bad;
        return next(err);
      }

      const token = user.generateToken();
      return res.status(Util.code.ok).json({ token });
    } catch (err) {
      next(err);
    }
  };
}

export default new AuthController();
