import { mergeResolvers } from 'merge-graphql-schemas';

import User from './User/';
import Team from './Team/';

const resolvers = [Team];

export default mergeResolvers(resolvers);
