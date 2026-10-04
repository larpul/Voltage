import { ThemeSettings, useThemeContext } from '@/common'
import {
  Activity,
  DarkLight,
  Helpdesk,
  Notifications,
  Profile,
  Search,
  useThemeCustomizer,
} from '@/components'
import Logo from '@/components/Common/Logo'
import { useViewport } from '@/hooks'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

type HeaderProps = {
  toggleMenu?: () => void
  navOpen?: boolean
}

const Header = ({ toggleMenu, navOpen }: HeaderProps) => {
  const { width } = useViewport()
  const { sidenavType } = useThemeCustomizer()
  const { updateSidebar } = useThemeContext()
  const handleLeftMenuCallBack = () => {
    if (width < 768) {
      if (sidenavType === 'full') {
        showLeftSideBarBackdrop()
        document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
      } else {
        updateSidebar({ size: ThemeSettings.sidebar.size.full })
      }
    } else if (sidenavType === 'iconbar') {
      updateSidebar({ size: ThemeSettings.sidebar.size.default })
    } else if (sidenavType === 'full') {
      showLeftSideBarBackdrop()
      document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
    } else if (sidenavType === 'fullscreen') {
      updateSidebar({ size: ThemeSettings.sidebar.size.default })
      document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
    } else {
      updateSidebar({ size: ThemeSettings.sidebar.size.iconbar })
    }
  }

  function showLeftSideBarBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.id = 'custom-backdrop'
    backdrop.className = 'offcanvas-backdrop fade show'
    document.body.appendChild(backdrop)

    backdrop.addEventListener('click', function () {
      document.getElementsByTagName('html')[0].classList.remove('sidebar-enable')
      hideLeftSideBarBackdrop()
    })
  }

  function hideLeftSideBarBackdrop() {
    const backdrop = document.getElementById('custom-backdrop')
    if (backdrop) {
      document.body.removeChild(backdrop)
      document.body.style.removeProperty('overflow')
    }
  }

  return (
    <>
      <header className="header-navbar">
        <div className="header-inner px-2 px-md-3">
          {/* header-left */}
          <div className="header-left d-flex align-items-center">
            <Link to="/" className="me-2">
              <Logo />
            </Link>
            <div className="header-btn me-2" onClick={handleLeftMenuCallBack} style={{ cursor: 'pointer' }}>
              <i className="fi fi-rr-bars-staggered fs-20"></i>
            </div>
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
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
