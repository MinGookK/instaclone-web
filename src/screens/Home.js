import { useQuery } from '@apollo/client'

import gql from 'graphql-tag'
import React from 'react'
import styled from 'styled-components'
import Photo from '../components/feed/Photo'

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      totalLike
      comments
      createdAt
      isMine
      isLiked
    }
  }
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => {
  const { data } = useQuery(FEED_QUERY)
  return (
    <MainContainer>
      {data?.seeFeed?.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </MainContainer>
  )
}

export default Home
