import { useEffect, useState } from "react"

const useIsClirnt = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}
export default useIsClirnt
