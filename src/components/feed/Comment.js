import React from 'react'
import styled from 'styled-components'
import { FatText } from '../shared'
import PropTypes from 'prop-types'
// user가 html tag를 보냈을 때 허용하지 않은 것은 다 지워버리도록 만듦
import * as sanitizeHtml from 'sanitize-html'
import { Link } from 'react-router-dom'

const CommentContainer = styled.div``
const CommentCaption = styled.span`
  margin-left: 5px;
  mark {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(' ').map((word, idx) =>
          /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g.test(word) ? (
            <React.Fragment key={idx}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  )
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
}
