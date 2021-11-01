import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Comment from './Comment'
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
export default function Comments({ caption, totalComment, author, comments }) {
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
    </CommentsContainer>
  )
}

Comments.propTypes = {
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
