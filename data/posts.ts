/**
 * fake data
 */

export interface Post {
  id: string
  title: string
  description: string
  author: string
  recommendPostIds: number[]
}

const postsData: Post[] = [
  {
    id: String(1),
    title: 'Post 1',
    description: 'desc 1',
    author: 'author 1',
    recommendPostIds: [2],
  },
  {
    id: String(2),
    title: 'Post 2',
    description: 'desc 2',
    author: 'author 2',
    recommendPostIds: [1, 3],
  },
  {
    id: String(3),
    title: 'Post 3',
    description: 'desc 3',
    author: 'author 3',
    recommendPostIds: [2, 4],
  },
  {
    id: String(4),
    title: 'Post 4',
    description: 'desc 4',
    author: 'author 4',
    recommendPostIds: [3],
  },
]

export default postsData
