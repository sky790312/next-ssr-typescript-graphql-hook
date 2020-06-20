const pexelsApiKey = '563492ad6f9170000100000182b7221645f64e9499fb49d910180f9b'

export const defaultPexelsPhotosUrl =
  'https://api.pexels.com/v1/search?query=nature'

export const fetchPexelsPhotos = async (pexelsPhotosUrl?: string) =>
  await fetch(pexelsPhotosUrl || defaultPexelsPhotosUrl, {
    headers: {
      Authorization: pexelsApiKey,
    },
  }).then(response => response.json())
