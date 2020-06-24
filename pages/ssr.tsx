import { FunctionComponent } from 'react'
import Spinner from '@/components/common/Spinner'
import dynamic from 'next/dynamic'
const PexelsSection = dynamic(() => import('@/components/ssr/PexelsSection'), {
  loading: () => <Spinner />,
})
import { fetchPexelsPhotos } from '@/lib/pexels'
import { PexelsPhotosApiRespSchema } from '@/lib/pexels/schema'

const ssrPage: FunctionComponent<{
  initialPexelsPhotosData: PexelsPhotosApiRespSchema
}> = ({ initialPexelsPhotosData }) => {
  return (
    <>
      <h3 className='text-center'>ssr example with pexels public api.</h3>
      <PexelsSection initialPexelsPhotosData={initialPexelsPhotosData} />
    </>
  )
}

export async function getStaticProps() {
  try {
    const initialPexelsPhotosData: PexelsPhotosApiRespSchema = await fetchPexelsPhotos()

    return {
      props: {
        initialPexelsPhotosData,
      },
    }
  } catch (error) {
    console.log('fetchPexelsPhotos error: ', error)

    return {
      props: {
        initialPexelsPhotosData: {},
      },
    }
  }
}

export default ssrPage
