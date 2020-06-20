import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'

const AppHeader: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <div>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>
      <HeaderRightContainer>
        <Link href='/ssr'>
          <a>ssr example</a>
        </Link>
        <Link href='/graphql'>
          <a>graphql example</a>
        </Link>
      </HeaderRightContainer>
    </HeaderContainer>
  )
}

export default AppHeader

const HeaderContainer = styled.div`
  padding: 5px 10px;
  background-color: ${Color.black};
  color: ${Color.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderRightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  a {
    padding: 0 10px;
  }
`
