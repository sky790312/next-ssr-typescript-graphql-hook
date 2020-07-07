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

const User = {
  // 每個 Field Resolver 都會預設傳入三個參數，
  // 分別為上一層的資料 (即 user)、參數 (下一節會提到) 以及 context (全域變數)
  friends: (parent, args, context) => {
    // 從 user 資料裡提出 friendIds
    const { friendIds } = parent
    // Filter 出所有 id 出現在 friendIds 的 user
    return usersData.filter(user => friendIds.includes(user.id))
  },
}

const resolvers = {
  Query,
  User,
}

export default resolvers
