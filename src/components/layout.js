import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useWindowDimensions } from '../util/useWindowDimensions';
import styled from 'styled-components';
import Menu from './menu';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import { GlobalStyles } from 'twin.macro';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template:
    '... ...... ...... ......  ...' var(--spacing-5)
    '... header header header  ...'
    '... ...... ...... ......  ...' var(--spacing-5)
    '... main   ...... sidebar ...' 1fr
    '... ...... ...... ......  ...' var(--spacing-5)
    '... footer footer footer  ...'
    '... ...... ...... ......  ...' var(--spacing-5)
    / minmax(var(--spacing-5), 1fr) minmax(400px, 5fr) var(--spacing-5) 340px minmax(var(--spacing-5), 1fr);

  @media (max-width: 991px) {
    grid-template:
      '... ......  ...' var(--spacing-5)
      '... header  ...'
      '... ......  ...' var(--spacing-3)
      '... main    ...' 1fr
      '... ......  ...' var(--spacing-3)
      '... sidebar ...'
      '... footer  ...'
      / var(--spacing-5) 1fr var(--spacing-5);
  }

  min-height: 100vh;

  header {
    grid-area: header;
  }

  footer {
    grid-area: footer;
  }

  main {
    grid-area: main;
  }

  aside {
    grid-area: sidebar;
  }
`;

const Layout = ({ isHomePage, children }) => {
  const {
    site: {
      meta: { links },
    },
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        meta: siteMetadata {
          links {
            twitter
            instagram
            linktree
          }
        }
      }
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `);

  const { width } = useWindowDimensions();

  return (
    <>
      <GlobalStyles />
      <Menu width={410 < width ? 410 : '80%'} />
      <LayoutWrapper>
        <Header title={title} isHomePage={isHomePage} />
        <main>{children}</main>
        <SideBar />
        <Footer links={links} />
      </LayoutWrapper>
    </>
  );
};

export default Layout;
