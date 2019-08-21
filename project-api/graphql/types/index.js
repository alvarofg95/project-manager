import { mergeTypes } from 'merge-graphql-schemas';

import User from './User/';
import Team from './Team/';

const typeDefs = [Team];

export default mergeTypes(typeDefs, { all: true });
