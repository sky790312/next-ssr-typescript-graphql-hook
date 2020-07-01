import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'

const AppHeader: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </HeaderContainer>
  )
}

export default AppHeader

const HeaderContainer = styled.div`
  padding: 10px;
  background-color: ${Color.black};
  color: ${Color.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
