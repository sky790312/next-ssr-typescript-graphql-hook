import { FunctionComponent } from 'react'
import Link from 'next/link'

const IndexPage: FunctionComponent = () => {
  return (
    <>
      <p>
        Nextjs is very amazing that build for every page individually. Check the
        following page sample.
      </p>
      <ul>
        <li>
          <Link href='/ssr'>
            <a>ssr example</a>
          </Link>
        </li>
        <li>
          <Link href='/graphql'>
            <a>graphql example</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default IndexPage
