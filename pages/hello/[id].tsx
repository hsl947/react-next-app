import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function HelloId() {
  const router = useRouter()
  const { id } = router.query
  if (process.browser) {
    // 这里是客户端
  }
  useEffect(() => {
    // console.log(1, window)
  }, [])
  return `当前 id -- ${id}`
}
