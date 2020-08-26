import { QueryResolvers, MutationResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import usersData from '@/data/users'
import postsData from '@/data/posts'

const meUser = usersData[0]

const getPostDetail = postId =>
  postsData.find(post => post.id === String(postId)) || null

const addPost = ({ title }) =>
  (postsData[postsData.length] = {
    id: postsData[postsData.length - 1].id + 1,
    title,
    // createdAt: new Date().toISOString(),
  })

const Query: Required<QueryResolvers<ResolverContext>> = {
  me: (_parent, _args, _context, _info) => meUser,
  users: (_parent, _args, _context, _info) => usersData,
  posts: (_parent, _args, _context, _info) => postsData,
  postDetail: (_parent, { id }, _context, _info) => getPostDetail(id),
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  addPost: (_parent, { input }, _context) => {
    console.log('in Mutation addPost: ', input)
    const { title } = input
    return addPost({ title })
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
