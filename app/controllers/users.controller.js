import BaseController from './base.controller';
import User from '../models/user';
import Util from '../lib/util';

class UsersController extends BaseController {

  whitelist = [
    'firstname',
    'lastname',
    'email',
    'username',
    'password',
  ];

  fetch = (req, res) => {
    const user = req.currentUser;

    if (!user) {
      return res.sendStatus(Util.code.notFound);
    }

    res.json(user);
  };

  create = async (req, res, next) => {
    const params = BaseController.filterParams(req.body, this.whitelist);

    let newUser = new User({
      ...params,
      provider: 'local',
    });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      res.status(Util.code.created).json({ token });
    } catch(err) {
      err.status = Util.code.bad;
      next(err);
    }
  };

  update = async (req, res, next) => {
    const newAttributes = BaseController.filterParams(req.body, this.whitelist);
    const updatedUser = Object.assign({}, req.currentUser, newAttributes);

    try {
      res.status(Util.code.ok).json(await updatedUser.save());
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    if (!req.currentUser) {
      return res.sendStatus(Util.code.forbidden);
    }

    try {
      await req.currentUser.remove();
      res.sendStatus(Util.code.deleted);
    } catch(err) {
      next(err);
    }
  };

  loadTest = async (req, res, next) => {
    return res.send('loaderio-d8963c94d78184b10ec466e330f21e4f');
  };
}

export default new UsersController();
