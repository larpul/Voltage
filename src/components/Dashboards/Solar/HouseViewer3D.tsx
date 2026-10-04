import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Installation } from './installationData'

interface Props {
  installation: Installation
}

const WALL_COLORS = ['#f2ede4', '#e9e2d4', '#dfe7ec', '#f0e6dd', '#e6e9e2']

const parsePitch = (roofType: string) => {
  const match = roofType.match(/(\d+(?:\.\d+)?)\s*\/\s*12/)
  return match ? Number(match[1]) / 12 : 0.5
}

const isFlatRoof = (roofType: string) => /flat|membrane|tpo/i.test(roofType)

const getRoofColor = (roofType: string) => {
  const t = roofType.toLowerCase()
  if (t.includes('slate')) return '#39404a'
  if (t.includes('metal')) return '#3d4b5c'
  if (t.includes('tile')) return '#b0642b'
  if (isFlatRoof(t)) return '#9aa4ad'
  return '#4b4f57'
}

const getAzimuth = (orientation: string) => {
  const match = orientation.match(/(\d+(?:\.\d+)?)\s*°/)
  if (match) return Number(match[1])
  if (/east/i.test(orientation)) return 90
  if (/west/i.test(orientation)) return 270
  return 180
}

/**
 * Interactive 3D view of a single installation's home, generated from that
 * project's own data: footprint follows the panel count, the roof pitch and
 * colour follow the roof type, and the array is rotated to the roof orientation.
 */
const HouseViewer3D = ({ installation }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // --- dimensions derived from this installation's system ---
    const panelCount = Math.min(installation.panelCount, 36)
    const width = 4 + panelCount / 12
    const depth = width * 0.72
    const wallHeight = 2.6
    const flatRoof = isFlatRoof(installation.roofType)
    const pitch = flatRoof ? 0 : parsePitch(installation.roofType)
    const roofHeight = flatRoof ? 0 : (width / 2) * pitch
    const overhang = 0.28
    const roofThickness = 0.12
    const halfSpan = width / 2 + overhang
    const rise = flatRoof ? 0 : roofHeight + overhang * pitch
    const slopeLength = flatRoof ? 0 : Math.hypot(halfSpan, rise)
    const slopeAngle = flatRoof ? 0 : Math.atan2(rise, halfSpan)
    const slopeDir = new THREE.Vector2(-halfSpan / (slopeLength || 1), rise / (slopeLength || 1))
    const slopeNormal = new THREE.Vector2(slopeDir.y, -slopeDir.x)
    const groundRadius = Math.max(width, depth) * 1.9
    const maxSpan = Math.max(width, depth)
    const azimuth = getAzimuth(installation.orientation)

    // --- compass: +Z is treated as south ---
    const azRad = THREE.MathUtils.degToRad(azimuth)
    const facing = new THREE.Vector3(Math.sin(azRad), 0, -Math.cos(azRad))
    const frontDir = new THREE.Vector3(Math.cos(azRad), 0, Math.sin(azRad))

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500)
    const viewDist = maxSpan * 2.1
    camera.position.set(
      (facing.x * 0.8 + frontDir.x * 0.75) * viewDist,
      maxSpan * 0.95,
      (facing.z * 0.8 + frontDir.z * 0.75) * viewDist,
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    // --- materials ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: WALL_COLORS[installation.id % WALL_COLORS.length],
      roughness: 0.95,
    })
    const roofMat = new THREE.MeshStandardMaterial({
      color: getRoofColor(installation.roofType),
      roughness: 0.85,
    })
    const frameMat = new THREE.MeshStandardMaterial({ color: '#aeb4bc', roughness: 0.6, metalness: 0.35 })
    const panelMat = new THREE.MeshStandardMaterial({ color: '#121a2c', roughness: 0.28, metalness: 0.55 })
    const doorMat = new THREE.MeshStandardMaterial({ color: '#6b4a35', roughness: 0.8 })
    const glassMat = new THREE.MeshStandardMaterial({ color: '#9fc6e0', roughness: 0.15, metalness: 0.4 })
    const groundMat = new THREE.MeshStandardMaterial({ color: '#cfe0c6', roughness: 1 })
    const bushMat = new THREE.MeshStandardMaterial({ color: '#6f9e63', roughness: 1 })

    const house = new THREE.Group()

    // ground
    const ground = new THREE.Mesh(new THREE.CircleGeometry(groundRadius, 48), groundMat)
    ground.rotation.x = -Math.PI / 2
    house.add(ground)

    // walls
    const walls = new THREE.Mesh(new THREE.BoxGeometry(width, wallHeight, depth), wallMat)
    walls.position.y = wallHeight / 2
    house.add(walls)

    // roof
    if (flatRoof) {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(width + overhang * 2, 0.25, depth + overhang * 2),
        roofMat,
      )
      slab.position.y = wallHeight + 0.125
      house.add(slab)
    } else {
      const triangle = new THREE.Shape()
      triangle.moveTo(-width / 2, 0)
      triangle.lineTo(width / 2, 0)
      triangle.lineTo(0, roofHeight)
      triangle.closePath()
      const atticGeo = new THREE.ExtrudeGeometry(triangle, { depth, bevelEnabled: false })
      atticGeo.translate(0, wallHeight, -depth / 2)
      house.add(new THREE.Mesh(atticGeo, wallMat))

      const slabGeo = new THREE.BoxGeometry(slopeLength, roofThickness, depth + overhang * 2)
      for (const side of [1, -1]) {
        const slab = new THREE.Mesh(slabGeo, roofMat)
        slab.position.set((side * halfSpan) / 2, wallHeight + (roofHeight - overhang * pitch) / 2, 0)
        slab.rotation.z = -side * slopeAngle
        house.add(slab)
      }
    }

    // --- solar panels ---
    const panelLen = 0.62 // along the slope
    const panelWide = 0.5 // along the ridge
    const gap = 0.07
    const panelGeo = new THREE.BoxGeometry(panelLen, 0.05, panelWide)
    const cellGeo = new THREE.BoxGeometry(panelLen * 0.82, 0.035, panelWide * 0.82)

    let placed = 0
    const addPanel = (x: number, y: number, z: number, rotZ: number) => {
      const panel = new THREE.Mesh(panelGeo, frameMat)
      panel.position.set(x, y, z)
      panel.rotation.z = rotZ
      const cell = new THREE.Mesh(cellGeo, panelMat)
      cell.position.set(0, 0.035, 0)
      panel.add(cell)
      house.add(panel)
      placed++
    }

    if (flatRoof) {
      const topY = wallHeight + 0.27
      const cols = Math.max(1, Math.floor((depth - 0.6) / (panelWide + gap)))
      const rows = Math.max(1, Math.floor((width - 0.6) / (panelLen + gap)))
      const startX = -((rows - 1) * (panelLen + gap)) / 2
      const startZ = -((cols - 1) * (panelWide + gap)) / 2
      for (let r = 0; r < rows && placed < panelCount; r++) {
        for (let c = 0; c < cols && placed < panelCount; c++) {
          addPanel(startX + r * (panelLen + gap), topY, startZ + c * (panelWide + gap), 0)
        }
      }
    } else {
      const cols = Math.max(1, Math.floor((depth + overhang * 2 - 0.4) / (panelWide + gap)))
      const rowsAvailable = Math.max(1, Math.floor((slopeLength - 0.5) / (panelLen + gap)))
      const rows = Math.min(rowsAvailable, Math.max(1, Math.ceil(panelCount / cols)))
      const startZ = -((cols - 1) * (panelWide + gap)) / 2
      const firstS = (slopeLength - ((rows - 1) * (panelLen + gap) + panelLen)) / 2 + panelLen / 2
      const offset = roofThickness / 2 + 0.045
      for (let r = 0; r < rows && placed < panelCount; r++) {
        const s = firstS + r * (panelLen + gap)
        const px = halfSpan + slopeDir.x * s + slopeNormal.x * offset
        const py = wallHeight - overhang * pitch + slopeDir.y * s + slopeNormal.y * offset
        for (let c = 0; c < cols && placed < panelCount; c++) {
          addPanel(px, py, startZ + c * (panelWide + gap), -slopeAngle)
        }
      }
    }

    // --- front door, windows, chimney, shrubs ---
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.9, 0.1), doorMat)
    door.position.set(0, 0.95, depth / 2 + 0.02)
    house.add(door)

    const windowGeo = new THREE.BoxGeometry(0.85, 0.85, 0.1)
    for (const side of [1, -1]) {
      const win = new THREE.Mesh(windowGeo, glassMat)
      win.position.set(side * (width / 4 + 0.2), 1.75, depth / 2 + 0.02)
      house.add(win)
    }

    if (!flatRoof) {
      const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), wallMat)
      chimney.position.set(-width * 0.28, wallHeight + roofHeight * 0.55, 0)
      house.add(chimney)
    }

    const bushGeo = new THREE.SphereGeometry(0.35, 14, 12)
    const bushPositions: [number, number][] = [
      [width * 0.42, depth / 2 + 0.5],
      [-width * 0.42, depth / 2 + 0.5],
      [width * 0.5, -depth * 0.35],
    ]
    bushPositions.forEach(([bx, bz]) => {
      const bush = new THREE.Mesh(bushGeo, bushMat)
      bush.position.set(bx, 0.28, bz)
      bush.scale.set(1, 0.8, 1)
      house.add(bush)
    })

    // rotate the home so the array faces its real compass orientation
    house.rotation.y = THREE.MathUtils.degToRad(90 - azimuth)
    scene.add(house)

    // --- lighting ---
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8d9c86, 1.5))
    const sun = new THREE.DirectionalLight(0xfff3dd, 2.1)
    sun.position.set(facing.x * 14, 18, facing.z * 14)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xdfe9ff, 0.6)
    fill.position.set(-facing.x * 12, 9, -facing.z * 12)
    scene.add(fill)

    // --- controls ---
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = maxSpan * 1.6
    controls.maxDistance = maxSpan * 5
    controls.maxPolarAngle = Math.PI / 2.05
    controls.target.set(0, wallHeight * 0.85, 0)
    controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    controls.autoRotateSpeed = 0.7

    // --- sizing ---
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    let raf = 0
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      controls.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const material = obj.material
          if (Array.isArray(material)) material.forEach((m) => m.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [installation])

  return (
    <div className="position-relative rounded overflow-hidden border">
      <div
        ref={mountRef}
        style={{
          height: '380px',
          width: '100%',
          background: 'linear-gradient(180deg, #eaf3fb 0%, #f6f9fc 55%, #eef3ea 100%)',
        }}
      />
      <div className="position-absolute bottom-0 start-0 m-3 px-2 py-1 rounded-pill bg-dark bg-opacity-75 text-white fs-12">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  )
}

export default HouseViewer3D
