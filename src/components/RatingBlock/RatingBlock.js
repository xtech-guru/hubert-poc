import React from "react"
import styled from "styled-components"

export const RatingBlock = ({ title, image, isLoading }) => {
  return (
    <RatingContent>
      <hr />
      <Row>
        <RatingTitle>{title}</RatingTitle>
        <div>
          <RatingWidget>
            <RatingWidgetTitle>RATE</RatingWidgetTitle>
            <div>
              <PostRating>
                <img
                  id="rating_12053_1"
                  src={image}
                  alt="1 Star"
                  title="1 Star"
                  onmouseover="current_rating(12053, 1, '1 Star');"
                  onmouseout="ratings_off(0, 0, 0);"
                  onclick="rate_post();"
                  onkeypress="rate_post();"
                />
                (No Ratings Yet)
                <br />
              </PostRating>
              <PostRatingLoading id="post-ratings-12053-loading">
                <img src={isLoading} />
                Loading...
              </PostRatingLoading>
            </div>
          </RatingWidget>
        </div>
      </Row>
      <hr />
    </RatingContent>
  )
}

const RatingContent = styled.div`
  text-align: center;
  color: #c7bcb2;
  font-size: 0.875rem;
  padding-left: 77px;
  padding-right: 233px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: -15px;
  margin-left: -15px;
`

const RatingTitle = styled.div`
  text-align: left;
`
const RatingWidget = styled.div`
  text-align: right;
  img {
    margin: 0;
    margin-right: 5px;
  }
`

const RatingWidgetTitle = styled.div`
  margin-right: 25px;
`
const PostRating = styled.div`
  width: 100%;
  opacity: 1;
  img{
    cursor: "pointer", border: "0px"
  }
`
const PostRatingLoading = styled.div`
  display: none;
  height: 16px;
  text-align: left;
  img {
    border: 0;
    padding: 0;
    margin: 0;
    width: 16px;
    height: 16px;
  }
`
