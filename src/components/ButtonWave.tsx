import classNames from 'classnames'
import { JSX } from 'preact'

type ButtonProps = {
  label: string
  mode?: 'onDark' | 'onLight'
} & JSX.HTMLAttributes<HTMLButtonElement>

const colors = {
  onDark: {
    'blob-btn': 'text-white hover:text-blue-600 before:border-white',
    'blob-btn__inner': 'bg-transparent',
    'blob-btn__blob': 'bg-white'
  },
  onLight: {
    'blob-btn': 'text-blue-600 hover:text-white before:border-blue-600',
    'blob-btn__inner': 'bg-transparent',
    'blob-btn__blob': 'bg-blue-600'
  }
}
export function ButtonWave({ label, mode = 'onDark', ...props }: ButtonProps) {
  const {
    'blob-btn': blobBtn,
    'blob-btn__inner': blobBtnInner,
    'blob-btn__blob': blobBtnBlob
  } = colors[mode]
  return (
    <div className='buttons'>
      <button
        className={classNames(
          blobBtn,
          'blob-btn px-5 py-4 rounded-full before:rounded-full text-sm font-extrabold before:border'
        )}
        {...props}
      >
        {label}
        <span
          className={classNames(blobBtnInner, 'rounded-full blob-btn__inner')}
        >
          <span className='blob-btn__blobs'>
            {[1, 2, 3, 4].map((_, i) => (
              <span
                key={i}
                className={classNames(blobBtnBlob, 'blob-btn__blob')}
              ></span>
            ))}
          </span>
        </span>
      </button>
      <br />

      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        style='display: none;'
      >
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              result='blur'
              stdDeviation='10'
            ></feGaussianBlur>
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7'
              result='goo'
            ></feColorMatrix>
            <feBlend in2='goo' in='SourceGraphic' result='mix'></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  )
}
