import classNames from 'classnames'

type LoaderProps = {
  width?: string
  height?: string
  color?: string
}

export function Loader({
  width = 'w-16',
  height = 'h-16',
  color = 'bg-ocean-500'
}: LoaderProps) {
  return (
    <div className={classNames('sk-cube-grid', width, height)}>
      {[...Array(9)].map((_, i) => (
        <div
          className={classNames(`sk-cube sk-cube${i + 1}`, color)}
          key={i}
        />
      ))}
    </div>
  )
}
