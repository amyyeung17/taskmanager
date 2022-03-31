export const size = {
  xs: '0px',
  sm: '600px',
  smscale: '905px',
  laptopfixed: '1240px',
  laptop: '1440px',
  desktop: '2560px'
}

export const limits = {
  xs: `(min-width:${ size.xs })`,
  sm: `(min-width: ${ size.sm })`,
  smscale: `(min-width: ${ size.smscale })`,
  laptopfixed: `(min-width:${ size.laptopfixed })`,
  laptop: `(min-width: ${ size.laptop })`,
  desktop: `(min-width: ${ size.desktop })`
}