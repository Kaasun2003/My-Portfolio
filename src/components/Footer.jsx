import { profile } from '../data/siteData'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <SocialLinks />
      </div>
    </footer>
  )
}
