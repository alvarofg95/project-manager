import mongodb from 'mongodb';
// The Team schema.
import Team from '../../../models/Team';
import ERRORS from '../../../utils/errors';

export default {
  Query: {
    team: (root, args) => {
      return new Promise((resolve, reject) => {
        Team.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    teams: () => {
      return new Promise((resolve, reject) => {
        Team.find({})
          .populate()
          .exec((err, res) => {
            console.log({ err, res });
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    addTeam: (root, { name, users = [], description }) => {
      return new Promise((resolve, reject) => {
        const newTeam = new Team({
          _id: new mongodb.ObjectId(),
          name,
          description,
          users,
          numUsers: users.length
        });
        newTeam.save((err, res) => {
          if (err && err.code === 11000) {
            reject(new Error(ERRORS.argsRegistered));
          }
          err
            ? reject(err)
            : resolve({
                _id: res._id,
                name: res.name,
                users: res.users,
                numUsers: res.email
              });
        });
      });
    },
    editTeamName: (root, { id, name }) => {
      return new Promise((resolve, reject) => {
        Team.findOneAndUpdate({ id }, { $set: { name } }).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editTeamUsers: (root, { id, users }) => {
      return new Promise((resolve, reject) => {
        Team.findOneAndUpdate({ id }, { $set: { users } }).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteTeam: (root, args) => {
      return new Promise((resolve, reject) => {
        Team.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
