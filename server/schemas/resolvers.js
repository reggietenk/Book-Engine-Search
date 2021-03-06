const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      users: async () => {
        return User.find()
          .populate('books');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .populate('books');
      },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
          
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            return user;
        }
      }
    };
   
    module.exports = resolvers;
