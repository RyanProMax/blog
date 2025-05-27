'use client';

import { AlgoliaButton } from 'pliny/search/AlgoliaButton';
import { KBarButton } from 'pliny/search/KBarButton';

import siteMetadata from '@/data/siteMetadata';

const SearchButtonWrapper = ({ children }) => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton;

    return <SearchButtonWrapper aria-label="Search">{children}</SearchButtonWrapper>;
  }
  return null;
};

export default SearchButtonWrapper;
