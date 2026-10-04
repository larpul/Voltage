import { useThemeContext } from '@/common/context'
import volt360LogoDark from '@/assets/images/logos/volt360-logo-dark.png'
import volt360LogoLight from '@/assets/images/logos/volt360-logo-light.png'

const Logo = () => {
  const { settings } = useThemeContext()
  const logo = settings.theme === 'dark' ? volt360LogoDark : volt360LogoLight

  return (
    <div className="barnd-logo">
      <img src={logo} alt="Volt360 — Solutions for a Greener Planet" style={{ height: '40px', width: 'auto' }} />
    </div>
  )
}

export default Logo
