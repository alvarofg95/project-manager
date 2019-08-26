import { mergeTypes } from 'merge-graphql-schemas';

import User from './User/';
import Team from './Team/';

const typeDefs = [User, Team];

export default mergeTypes(typeDefs, { all: true });
