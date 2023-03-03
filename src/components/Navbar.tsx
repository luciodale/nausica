import classNames from 'classnames'
import { useState } from 'preact/hooks'
import 'preact/jsx-runtime'
import { useOutsideClick } from '../utils'
import { Close } from './Icons'

type NavLinkProp = {
  href: string
  label: string
  target?: string
  active?: boolean
  onClick?: () => void
}

function NavLink({ label, href, target, active, onClick }: NavLinkProp) {
  const targetProp = target ? { target } : {}

  return (
    <a
      {...targetProp}
      onClick={onClick}
      className={classNames(
        'md:text-tortora-900 md:hover:text-tortora-600 transition-colors text-tortora-200 hover:text-tortora-500',
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

  return (
    <>
      <nav
        className={classNames(
          'w-full fixed transition-all bg-tortora-200 z-30 h-14'
        )}
      >
        <div className='transition-all text-black container mx-auto px-4 sm:px-12 2xl:px-0 max-w-7xl flex flex-wrap items-center justify-end h-full'>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='z-10 inline-flex items-center p-2 ml-3 text-sm text-tortora-200 rounded-lg md:hidden hover:bg-tortora-400 focus:outline-none focus:ring-2 focus:ring-tortora-900'
            aria-controls='navbar-default'
            aria-expanded='false'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='w-6 h-6m stroke-tortora-900'
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
          <div className='hidden md:flex gap-8 uppercase tracking-widest text-xs'>
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
      {/* mobile */}
      <nav ref={ref}>
        <div
          className={classNames(
            'fixed top-0 h-full p-4 flex z-50 bg-tortora-900 w-1/2 flex-col gap-10 items-center md:hidden overflow-hidden transition-all',
            {
              '-right-full': !isMenuOpen,
              'right-0 pb-4': isMenuOpen
            }
          )}
        >
          <div
            className='w-8 cursor-pointer'
            onClick={() => setIsMenuOpen(false)}
          >
            <Close />
          </div>
          <div class='flex flex-col justify-center items-center uppercase tracking-widest text-sm gap-6'>
            {navLinks.map((page) => (
              <NavLink
                href={page.href}
                label={page.label}
                target={page.target}
                onClick={() => setIsMenuOpen(false)}
                active={page.active}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
