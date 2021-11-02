import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Comment from './Comment'
import { useForm } from 'react-hook-form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'

const CommentsContainer = styled.div`
  margin-top: 5px;
`
const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 12px;
  display: block;
`

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: Int!, $payload: String!) {
    createComment(id: $id, payload: $payload) {
      ok
      id
      error
    }
  }
`
export default function Comments({
  photoId,
  caption,
  totalComment,
  author,
  comments,
}) {
  const { data: userData } = useUser()
  const updateCreateComment = (cache, result) => {
    const payload = getValues('payload')
    setValue('payload', '')
    const {
      data: {
        createComment: { ok, id },
      },
    } = result
    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now() + '',
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      }
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      })
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment]
          },
          totalComment(prev) {
            return prev + 1
          },
        },
      })
    }
  }
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateCreateComment,
    }
  )
  const { register, handleSubmit, setValue, getValues } = useForm()
  const onValid = data => {
    const { payload } = data
    if (loading) {
      return
    }
    createCommentMutation({
      variables: {
        id: photoId,
        payload,
      },
    })
  }

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {totalComment === 1 ? '1 comment' : `${totalComment} comment`}
      </CommentCount>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          photoId={photoId}
          id={comment.id}
          author={comment.user.username}
          isMine={comment.isMine}
          payload={comment.payload}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register('payload')}
            placeholder="댓글을 입력해 주세요."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  )
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  caption: PropTypes.string,
  totalComment: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
}
