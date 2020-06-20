import { FunctionComponent } from 'react'
import { useViewerQuery } from '@/lib/graphql/viewer.graphql'

const Example: FunctionComponent = () => {
  const { data } = useViewerQuery()
  const { viewer } = data!

  return (
    <>
      <p>
        You're signed in as id: {viewer.id} - {viewer.name} and you're{' '}
        {viewer.status} go to the{' '}
      </p>
    </>
  )
}

export default Example
