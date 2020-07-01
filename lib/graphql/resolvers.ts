import { QueryResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import viewerData from '@/data/viewer'
import postsData from '@/data/posts'

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer: (_parent, _args, _context, _info) => viewerData,
  posts: (_parent, _args, _context, _info) => postsData,
  // postDetail(_parent, _args, _context, _info) {
  //   return { id: String(1), title: 'Post 1' }
  // },
}

export default { Query }
