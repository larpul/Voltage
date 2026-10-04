import { useEffect, useState } from 'react'

let mapInstanceId = 0

interface MapBaseProps {
  width?: string
  height?: string
  options?: any
  type: string
  onMarkerClick?: (index: number) => void
}

const MapBase = ({ width, height, options, type, onMarkerClick }: MapBaseProps) => {
  const [selectorId] = useState(() => `map-${type}-${++mapInstanceId}`)
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) {
      const map = new (window as any)['jsVectorMap']({
        selector: '#' + selectorId,
        map: type,
        ...options,
      })

      if (onMarkerClick) {
        const container = document.getElementById(selectorId)
        container?.addEventListener('click', (e: any) => {
          const marker = (e.target as Element)?.closest('circle.jvm-marker')
          if (marker) {
            const index = parseInt(marker.getAttribute('data-index') || '-1', 10)
            if (index >= 0) onMarkerClick(index)
          }
        })
      }

      setMap(map)
    }
  }, [selectorId, map, options, type, onMarkerClick])

  return (
    <>
      <div id={selectorId} style={{ width: width, height: height }}></div>
    </>
  )
}

export default MapBase
