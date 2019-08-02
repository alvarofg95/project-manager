import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create the User Schema.
const UserSchema = new Schema({
  nick: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
