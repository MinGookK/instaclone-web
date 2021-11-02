import React from 'react'
import { useParams } from 'react-router'

export default function Profile() {
  const params = useParams()
  console.log(params)
  return <div>프로필페이지입니다.</div>
}
