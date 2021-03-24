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
                <RatingImage
                  id="rating_12053_1"
                  src={image}
                  alt="1 Star"
                  title="1 Star"
                />
                (No Ratings Yet)
                <br />
              </PostRating>
              <PostRatingLoading id="post-ratings-12053-loading">
                <LoadingImage
                  src={require("../../images/loading.gif")}
                  alt="Wird geladen"
                />
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
  @media (min-width: 768px) {
    text-align: center;
    color: #c7bcb2;
    font-size: 0.875rem;
    padding-left: 77px;
    padding-right: 233px;
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-right: -15px;
    margin-left: -15px;
  }
`

const RatingTitle = styled.div`
  text-align: left;
`
const RatingWidget = styled.div`
  display: flex;
  @media (min-width: 768px) {
    flex-direction: column;
    text-align: right;
  }
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
`
const RatingImage = styled.img`
  cursor: pointer;
  border: 0;
`
const PostRatingLoading = styled.div`
  display: none;
  height: 16px;
  text-align: left;
`

const LoadingImage = styled.img`
  border: 0;
  padding: 0;
  margin: 0;
  width: 16px;
  height: 16px;
`
