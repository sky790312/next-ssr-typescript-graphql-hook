export interface PexelsPhotosApiRespSchema {
  prev_page?: string
  next_page?: string
  page: number
  per_page: number
  photos: PexelsPhotoSchema[]
  total_results: number
}

export interface PexelsPhotoSchema {
  height: number
  id: number
  liked: boolean
  photographer: string
  photographer_id: number
  photographer_url: string
  src: PexelsPhotoSrcSchema
  url: string
  width: number
}

export interface PexelsPhotoSrcSchema {
  landscape: string
  large: string
  large2x: string
  medium: string
  portrait: string
  small: string
  tiny: string
}
