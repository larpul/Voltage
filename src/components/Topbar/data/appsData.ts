import gmail from '@/assets/images/brands/gmail.png'
import dropbox from '@/assets/images/brands/dropbox.png'
import gDrive from '@/assets/images/brands/google-drive.png'
import figma from '@/assets/images/brands/figma.png'
import gitlab from '@/assets/images/brands/gitlab.png'

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
