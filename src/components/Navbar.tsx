import classNames from 'classnames'
import { useState } from 'preact/hooks'
import 'preact/jsx-runtime'
import { useOutsideClick } from '../utils'

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
        'relative py-1 text-sm tracking-wide transition-colors duration-300',
        'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ocean-500 after:transition-all after:duration-300',
        'hover:text-ocean-600 hover:after:w-full',
        active ? 'text-ocean-600 after:w-full' : 'text-ink-700'
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
          'fixed top-0 left-0 right-0 z-50',
          'bg-sand-50/95 backdrop-blur-sm',
          'border-b border-sand-200',
          'transition-all duration-300'
        )}
      >
        <div className='container-wide h-16 flex items-center justify-between'>
          {/* Logo */}
          <a href='/' className='flex items-center'>
            <img 
              src='/images/logo.svg' 
              alt='Nausica Beach' 
              className='h-10 w-auto'
            />
          </a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-10'>
            {navLinks.map((page) => (
              <NavLink
                key={page.href}
                href={page.href}
                label={page.label}
                target={page.target}
                active={page.active}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type='button'
            className='md:hidden p-2 text-ink-600 hover:text-ink-900 transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              {isMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16m-7 6h7' />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={classNames(
          'fixed inset-0 z-40 bg-ink-900/50 backdrop-blur-sm md:hidden',
          'transition-opacity duration-300',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <nav
        ref={ref}
        className={classNames(
          'fixed top-0 right-0 z-50 h-full w-72 md:hidden',
          'bg-sand-50 border-l border-sand-200',
          'transition-transform duration-300 ease-elegant',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Close button */}
          <div className='flex justify-end p-4'>
            <button
              onClick={() => setIsMenuOpen(false)}
              className='p-2 text-ink-500 hover:text-ink-800 transition-colors'
              aria-label='Close menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Mobile Links */}
          <div className='flex flex-col gap-1 px-6'>
            {navLinks.map((page) => (
              <a
                key={page.href}
                href={page.href}
                onClick={() => setIsMenuOpen(false)}
                className={classNames(
                  'py-4 text-lg font-display font-light text-ink-700',
                  'border-b border-sand-200',
                  'hover:text-ocean-600 transition-colors duration-300'
                )}
              >
                {page.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
