import npm from '@/assets/images/brands/gmail.png'
import github from '@/assets/images/brands/github.png'
import sketch from '@/assets/images/brands/sketch.png'
import figma from '@/assets/images/brands/figma.png'
import gitlab from '@/assets/images/brands/gitlab.png'

interface appsData {
  name: string
  img: string
}

export const appsData: appsData[] = [
  {
    name: 'NPM',
    img: npm,
  },
  {
    name: 'Github',
    img: github,
  },
  {
    name: 'Sketch',
    img: sketch,
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
