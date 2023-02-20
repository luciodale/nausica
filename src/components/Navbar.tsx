import 'preact/jsx-runtime'
import classNames from 'classnames'
import { useEffect, useState } from 'preact/hooks'
import logo from '/images/logo.svg'
import { useOutsideClick } from '../utils'
import DarkModeSwitch from './DarkModeSwitch'

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
        'nav-link text-black hover:text-blue-500 transition-colors first-of-type:pt-4 md:first-of-type:pt-0',
        active ?? 'text-blue-500'
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
        'w-full fixed transition-all bg-white z-50 md:py-4 h-14'
      )}
      ref={ref}
    >
      <div className='transition-all text-black container mx-auto px-4 sm:px-12 2xl:px-0 max-w-7xl flex flex-wrap items-center justify-between h-full'>
        <a href='/' class='flex items-center w-20 z-10'>
          {/* <img src={logo} alt='Juxt Logo' /> */}
          NAUSICA
        </a>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='group z-10 inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
          aria-controls='navbar-default'
          aria-expanded='false'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='w-6 h-6 stroke-black group-hover:stroke-white'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h16m-7 6h7'
            ></path>
          </svg>
        </button>
        {/* desktop */}
        <div className={classNames('hidden md:flex', linkClasses)}>
          {navLinks.map((page) => (
            <NavLink
              href={page.href}
              label={page.label}
              target={page.target}
              active={page.active}
            />
          ))}
          <DarkModeSwitch />
        </div>

        {/* mobile */}
        <div
          id='navbar-mobile'
          className={classNames(
            'absolute left-0 top-14 flex bg-white w-full flex-col md:hidden overflow-hidden transition-all',
            linkClasses,
            {
              'max-h-0': !isMenuOpen,
              'max-h-screen pb-4': isMenuOpen
            }
          )}
        >
          {navLinks.map((page) => (
            <NavLink
              href={page.href}
              label={page.label}
              target={page.target}
              active={page.active}
            />
          ))}
          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  )
}
