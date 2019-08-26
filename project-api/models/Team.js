import mongoose from 'mongoose';
import { truncate } from 'fs';

const Schema = mongoose.Schema;

// Create the User Schema.
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  numUsers: {
    type: Number,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  slug: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const Team = mongoose.model('Team', TeamSchema);

export default Team;
