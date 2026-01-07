import {
  Activity,
  DarkLight,
  Helpdesk,
  Notifications,
  Profile,
  Search,
} from '@/components'
import Logo from '@/components/Common/Logo'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

type HeaderProps = {
  toggleMenu?: () => void
  navOpen?: boolean
}

const Header = ({ toggleMenu, navOpen }: HeaderProps) => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  function handleMegaMenuClick() {
    setMegaMenuOpen(!megaMenuOpen)
    if (!megaMenuOpen) {
      document.body.classList.add('megamenu-open')
      showBackdrop()
    } else {
      document.body.classList.remove('megamenu-open')
      hideBackdrop()
    }
  }

  function showBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.id = 'megaMenuBackdrop'
    backdrop.className = 'offcanvas-backdrop fade show z-1030'
    document.body.appendChild(backdrop)

    backdrop.addEventListener('click', handleBackdropClick)
  }

  function hideBackdrop() {
    const backdrop = document.getElementById('megaMenuBackdrop')
    if (backdrop) {
      backdrop.removeEventListener('click', handleBackdropClick)
      document.body.removeChild(backdrop)
    }
  }

  function handleBackdropClick() {
    setMegaMenuOpen(false)
    document.body.classList.remove('megamenu-open')
    hideBackdrop()
  }



  return (
    <>
      <header className="header-navbar">
        <div className="header-inner px-2 px-md-3">
          {/* header-left */}
          <div className="header-left d-flex align-items-center">
            <Link to="/">
              <Logo />
            </Link>
            <DarkLight />

            <MegaMenu />
          </div>
          {/* header-right */}
          <div className="header-right d-flex align-items-center justify-content-center">
            <Search />
            <span className="d-none d-sm-flex">
              <Activity />
              <Helpdesk />
            </span>
            <Notifications />
            <Profile />
            <div className="header-btn pe-md-0 d-lg-none" onClick={handleMegaMenuClick}>
              <i className="fi fi-rr-menu-burger"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
