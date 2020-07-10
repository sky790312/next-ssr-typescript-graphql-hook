import { QueryResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import usersData from '@/data/users'
import postsData from '@/data/posts'

const getPostDetail = postId =>
  postsData.find(post => post.id === String(postId)) || null

const Query: Required<QueryResolvers<ResolverContext>> = {
  me: (_parent, _args, _context, _info) => usersData[0],
  users: (_parent, _args, _context, _info) => usersData,
  posts: (_parent, _args, _context, _info) => postsData,
  postDetail: (_parent, { id }, _context, _info) => getPostDetail(id),
}

// const Mutation = {}

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
  // Mutation,
  User,
  Post,
}

export default resolvers
