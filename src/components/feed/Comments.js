import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Comment from './Comment'
import { useForm } from 'react-hook-form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

const CommentsContainer = styled.div`
  margin-top: 5px;
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
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  )
  const { register, handleSubmit, setValue } = useForm()
  const onValid = data => {
    const { payload } = data
    createCommentMutation({
      variables: {
        id: photoId,
        payload,
      },
    })
    setValue('payload', '')
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
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input {...register('payload')} placeholder="댓글을 입력해 주세요." />
        </form>
      </div>
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
