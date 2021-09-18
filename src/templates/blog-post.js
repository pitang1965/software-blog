import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { Button } from '../components/Button';
import styled, { css } from 'styled-components';

const PostWrapper = styled.article`
  display: grid;
  ${props =>
    props.noimage
      ? css`
          grid-template:
            '... ......  ...' var(--spacing-2)
            '... header  ...'
            '... .......  ...' var(--spacing-2)
            '... content ...'
            '... ......  ...' var(--spacing-2)
            '... buttons ...'
            '... ......  ...' var(--spacing-2)
            / var(--spacing-2) 1fr var(--spacing-2);
        `
      : css`
          grid-template:
            '... ......  ......  ......  ...' var(--spacing-2)
            '... header  header  header  ...'
            '... ......  ......  ......  ...' var(--spacing-2)
            '... image   ......  ......  ...' 300px
            '... ......  ......  ......  ...' var(--spacing-2)
            '... content content content ...'
            '... ......  ......  ......  ...' var(--spacing-2)
            '... buttons buttons buttons ...'
            '... ......  ......  ......  ...' var(--spacing-2)
            / var(--spacing-2) 300px var(--spacing-2) 1fr var(--spacing-2);
        `};

  border: 1px solid #ddd;
`;

const PostHeader = styled.header`
  grid-area: header;
  font-family: var(--font-heading);
  font-size: var(--fontSize-4);
  span {
    color: var(--color-primary);
  }
  small {
    font-size: var(--fontSize-2);
  }
`;

const ImageWrapper = styled.div`
  grid-area: image;
  img {
    max-width: 300px;
    min-width: 300px;
    max-height: 300px;
    min-width: 300px;
  }
`;

const ContentWrapper = styled.section`
  grid-area: content;

  a {
    text-decoration: underline;
    color: var(--color-link);
  }
  a:hover {
    color: var(--color-link-hover);
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: var(--spacing-6);
    margin-bottom: var(--spacing-6);
  }
  h2 {
    border-left: 8px solid #999;
    font-size: var(--fontSize-3);
    font-weight: var(--fontWeight-semibold);
    padding: var(--spacing-2) var(--spacing-5);
    line-height: var(--spacing-7);
  }
  h3 {
    font-size: var(--fontSize-2);
    padding: 2px 15px;
    margin-left: 5px;
    border-left: 2px #999 solid;
  }
  h4 {
    font-size: var(--fontSize-2);
    padding: 0 12px;
    border: 0;
    border-left: solid 12px #999;
  }
  ol {
    list-style: decimal;
    padding-left: 30px;
  }
  overflow: scroll;
`;

const ButtonsWrapper = styled.nav`
  grid-area: buttons;
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-2);

  > first-child {
    height: auto;
    flex-grow: 1;
    font-size: 0.8em;
    ::before {
      content: '<< ';
      font-size: 1.2em;
      font-weight: bold;
    }
  }
  > last-child {
    height: auto;
    flex-grow: 1;
    font-size: 0.8em;
    ::after {
      content: ' >>';
      font-size: 1.2em;
      font-weight: bold;
    }
  }
`;

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    imageData:
      post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.altText || ``,
    publicURL: post.featuredImage?.node?.localFile?.publicURL,
  };

  const noImage = !featuredImage?.imageData;

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        imageUrl={featuredImage.publicURL}
      />
      <PostWrapper
        itemScope
        itemType="http://schema.org/Article"
        noimage={noImage}
      >
        <PostHeader>
          <div>
            <span itemProp="headline">{parse(post.title)}</span>
          </div>
          <small>{post.date}</small>
        </PostHeader>
        {/* if we have a featured image for this post let's display it */}
        {!noImage && (
          <ImageWrapper>
            <GatsbyImage
              image={featuredImage.imageData}
              alt={featuredImage.alt}
            />
          </ImageWrapper>
        )}
        {!!post.content && (
          <ContentWrapper itemProp="articleBody">
            {parse(post.content)}
          </ContentWrapper>
        )}
        <ButtonsWrapper>
          {previous && (
            <Button to={previous.uri} rel="prev">
              {parse(previous.title)}
            </Button>
          )}
          {next && (
            <Button to={next.uri} rel="next">
              {parse(next.title)}
            </Button>
          )}
        </ButtonsWrapper>
      </PostWrapper>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "YYYY-MM-DD")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 80
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
            publicURL
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
