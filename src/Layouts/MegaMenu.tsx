import {
  MegaMenuApps,
  MegaMenuAuth,
  MegaMenuHome,
  MegaMenuPages,
} from '@/components/Topbar/MegaMenu'
import { useState } from 'react'

const MegaMenu = () => {
  const [homeOpen, setHomeOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  function megaMenuClose() {
    document.body.classList.remove('megamenu-open')
    const backdrop = document.getElementById('megaMenuBackdrop')
    if (backdrop) {
      document.body.removeChild(backdrop)
    }
  }

  return (
    <>
      <div className="megamenu">
        <div
          className="w-100 d-flex d-lg-none align-items-center gap-4 ps-4 pe-3 py-3 border-bottom"
          style={{ height: '4.5rem' }}
        >
          <h5 className="mb-0">Navigation</h5>
          <div className="ms-auto btn btn-light btn-icon btn-md" onClick={megaMenuClose}>
            <i className="fi fi-rr-cross"></i>
          </div>
        </div>
      
      </div>
    </>
  )
}

export default MegaMenu
