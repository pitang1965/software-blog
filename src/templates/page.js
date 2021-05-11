import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const PageWrapper = styled.article`
  a {
    text-decoration: underline;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: var(--spacing-6);
    margin-bottom: var(--spacing-6);
  }
  h1 {
    border-left: 8px solid #999;
    font-size: var(--fontSize-4);
    font-weight: var(--fontWeight-bold);
    padding: var(--spacing-2) var(--spacing-5);
    line-height: var(--spacing-7);
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
  ul {
    list-style-type: disc;
    padding-left: 30px;
  }
`;

const PageTemplate = ({ data }) => (
  <Layout>
    <PageWrapper>
      <h1 dangerouslySetInnerHTML={{ __html: data.wpPage.title }} />
      <div dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />
    </PageWrapper>
  </Layout>
);

export default PageTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 80
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`;
