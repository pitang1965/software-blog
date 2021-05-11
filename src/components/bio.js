/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin: var(--spacing-4);

  img {
    margin-right: var(--spacing-4);
    margin-bottom: var(--spacing-0);
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
`;

const Bio = () => {
  const { author } = useStaticQuery(graphql`
    query BioQuery {
      # if there was more than one user, this would need to be filtered
      author: wpUser {
        firstName
        twitter: name
        description
        avatar {
          url
        }
      }
    }
  `);

  const avatarUrl = author?.avatar?.url;

  return (
    <BioWrapper>
      {avatarUrl && <img alt={author?.firstName || ``} src={avatarUrl} />}
      {author?.firstName && (
        <p>
          著者：<strong>{author.firstName}</strong>
          {` `}
          {author?.description || null}
          {` `}
          {author?.twitter && (
            <a href={`https://twitter.com/${author?.twitter || ``}`}>
              お気軽にフォロー願います。
            </a>
          )}
        </p>
      )}
    </BioWrapper>
  );
};

export default Bio;
