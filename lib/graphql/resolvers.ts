import { QueryResolvers, MutationResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import usersData from '@/data/users'
import postsData from '@/data/posts'

const meUser = usersData[0]
const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
}

const getPostDetail = postId =>
  postsData.find(post => post.id === String(postId)) || null

const Query: Required<QueryResolvers<ResolverContext>> = {
  me: (_parent, _args, _context, _info) => meUser,
  users: (_parent, _args, _context, _info) => usersData,
  posts: (_parent, _args, _context, _info) => postsData,
  postDetail: (_parent, { id }, _context, _info) => getPostDetail(id),
  viewer: (_parent, _args, _context, _info) => userProfile,
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, { name }, _context, _info) {
    userProfile.name = name
    return userProfile
  },
}

const getUserFreinds = friendIds =>
  usersData.filter(user => friendIds.includes(Number(user.id)))

const User = {
  friends: ({ friendIds }, args, context) => getUserFreinds(friendIds),
}

const getRecommendPosts = recommendPostIds =>
  postsData.filter(post => recommendPostIds.includes(Number(post.id)))

const Post = {
  recommendPosts: ({ recommendPostIds }, args, context) =>
    getRecommendPosts(recommendPostIds),
}

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
}

export default resolvers
