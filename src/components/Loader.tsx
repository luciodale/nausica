import classNames from 'classnames'

export function Loader({
  width = 'w-20',
  height = 'h-20',
  color = 'bg-tortora-500'
}: {
  width?: string
  height?: string
  color?: string
}) {
  return (
    <div className={classNames('sk-cube-grid', width, height)}>
      {[...Array(9)].map((_, i) => (
        <div
          className={classNames(`sk-cube sk-cube${i + 1}`, color)}
          key={i}
        ></div>
      ))}
    </div>
  )
}
