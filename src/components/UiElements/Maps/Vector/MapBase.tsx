import { useEffect, useState } from 'react'

let mapInstanceId = 0

interface MapBaseProps {
  width?: string
  height?: string
  options?: any
  type: string
}

const MapBase = ({ width, height, options, type }: MapBaseProps) => {
  const [selectorId] = useState(() => `map-${type}-${++mapInstanceId}`)
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) {
      const map = new (window as any)['jsVectorMap']({
        selector: '#' + selectorId,
        map: type,
        ...options,
      })

      setMap(map)
    }
  }, [selectorId, map, options, type])

  return (
    <>
      <div id={selectorId} style={{ width: width, height: height }}></div>
    </>
  )
}

export default MapBase
