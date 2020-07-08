import { QueryResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import usersData from '@/data/users'
import postsData from '@/data/posts'

const Query: Required<QueryResolvers<ResolverContext>> = {
  me: (_parent, _args, _context, _info) => usersData[0],
  users: (_parent, _args, _context, _info) => usersData,
  posts: (_parent, _args, _context, _info) => postsData,
  // postDetail(_parent, _args, _context, _info) {
  //   return { id: String(1), title: 'Post 1' }
  // },
}

// const Mutation = {}

const User = {
  friends: (parent, args, context) => {
    const { friendIds } = parent
    return usersData.filter(user => friendIds.includes(parseInt(user.id, 10)))
  },
}

const Post = {
  recommendPosts: (parent, args, context) => {
    const { recommendPostIds } = parent
    return postsData.filter(post =>
      recommendPostIds.includes(parseInt(post.id, 10)),
    )
  },
}

const resolvers = {
  Query,
  // Mutation,
  User,
  Post,
}

export default resolvers
