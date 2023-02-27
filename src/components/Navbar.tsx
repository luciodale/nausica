import classNames from 'classnames'
import { useState } from 'preact/hooks'
import 'preact/jsx-runtime'
import { useOutsideClick } from '../utils'

type NavLinkProp = {
  href: string
  label: string
  target?: string
  active?: boolean
}

function NavLink({ label, href, target, active }: NavLinkProp) {
  const targetProp = target ? { target } : {}

  return (
    <a
      {...targetProp}
      className={classNames(
        'nav-link text-tortora-900 hover:text-tortora-600 transition-colors first-of-type:pt-4 md:first-of-type:pt-0',
        active ?? 'hover:text-tortora-600'
      )}
      href={href}
    >
      {label}
    </a>
  )
}

type Navbar = { navLinks: NavLinkProp[] }

export default function Navbar({ navLinks }: Navbar) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useOutsideClick(() => setIsMenuOpen(false))
  const linkClasses = 'items-center gap-8 uppercase tracking-widest text-xs'

  return (
    <nav
      className={classNames(
        'w-full fixed transition-all bg-tortora-200 z-40 md:py-4 h-14'
      )}
      ref={ref}
    >
      <div className='transition-all text-black container mx-auto px-4 sm:px-12 2xl:px-0 max-w-7xl flex flex-wrap items-center justify-between h-full'>
        <div></div>

        {/* desktop */}
        <div className={classNames('md:flex', linkClasses)}>
          {navLinks.map((page) => (
            <NavLink
              href={page.href}
              label={page.label}
              target={page.target}
              active={page.active}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
