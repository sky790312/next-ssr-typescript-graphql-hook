declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'test' | 'production' | 'development'
    WEBPACK_ANALYZER?: 'on'
  }
}

/**
 * Object keys and values as type
 *
 * @example
 * const kolActions = { searchKol(...), getKol(...) }
 *
 * interface Actions {
 *   kol: ObjectKeysValues<typeof kolActions>
 * }
 *
 * @example
 * const kolActions = { searchKol(...), getKol(...) }
 * const uploadActions = { uploadAvatar(...), uploadImage(...) }
 *
 * interface Props {
 *   actions: ObjectKeysValues<typeof kolActions> &
 *            ObjectKeysValues<typeof uploadActions>
 * }
 */
type ObjectKeysValues<TObject> = { [key in keyof TObject]: TObject[key] }

/** via {loader: '@svgr/webpack'} */
declare module '*.svg' {
  export default React.Component
}
/** via {loader: 'file-loader'} */
declare module '@/assets/*.svg' {
  export default string
}

/** via {loader: 'file-loader'} */
declare module '*.png' {
  export default string
}

/** via {loader: 'file-loader'} */
declare module '*.jpg' {
  export default string
}

/** via {loader: 'file-loader'} */
declare module '*.gif' {
  export default string
}

/**
 * 使 object 中的指定鍵，成為 required。
 *
 * @example
 * type Person { id? name? email? }
 *
 * // type Person { id name? email }
 * RequiredByKeys<Person, 'id' | 'email'>
 */
type RequiredByKeys<T, K extends keyof T> = Required<Pick<T, K>> & Exclude<T, K> // don't know why error.

interface Window {}

// The elements you list here will be accepted, attributes don't matter
declare namespace JSX {
  interface IntrinsicElements {
    'amp-script': any
    'amp-img': any
    'amp-carousel': any
    'amp-video': any
    'amp-story': any
    'amp-story-page': any
    'amp-story-grid-layer': any
    'amp-story-bookend': any
  }

  interface HTMLScriptElement {
    target: any
  }
}

/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}
