import gmail from '@/assets/images/brands/gmail.png'
import dropbox from '@/assets/images/brands/dropbox.png'
import gDrive from '@/assets/images/brands/google-drive.png'
import figma from '@/assets/images/brands/figma.png'
import github from '@/assets/images/brands/github.png'
import gitlab from '@/assets/images/brands/gitlab.png'
import instagram from '@/assets/images/brands/instagram.png'
import pinterest from '@/assets/images/brands/pinterest.png'
import facebook from '@/assets/images/brands/facebook.png'
import shopify from '@/assets/images/brands/shopify.png'
import spotify from '@/assets/images/brands/spotify.png'
import whatsapp from '@/assets/images/brands/whatsapp.png'

interface appsData {
  name: string
  img: string
}

export const appsData: appsData[] = [
  {
    name: 'NPM',
    img: gmail,
  },
  {
    name: 'Github',
    img: dropbox,
  },
  {
    name: 'Sketch',
    img: gDrive,
  },
  {
    name: 'Figma',
    img: figma,
  },
  {
    name: 'Gitlab',
    img: gitlab,
  },
  
]
