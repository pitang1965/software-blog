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
            <p>
              <a href={`https://twitter.com/${author?.twitter || ``}`}>
                Twitter
              </a>
              をお気軽にフォロー願います。
            </p>
          )}
        </p>
      )}
      <p>
        このサイトは<a href={`https://www.gatsbyjs.com/`}>Gatsby.js</a>を用いたヘッドレスWordPressサイトです。
        元のWordPressサイトは
        <a href={`https://software.pitang1965.com/`}>こちら</a>
        です。
      </p>
    </BioWrapper>
  );
};

export default Bio;
