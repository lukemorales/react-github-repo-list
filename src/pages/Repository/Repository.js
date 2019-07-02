import React from 'react';
// import {} from './RepositoryStyles.js';

export default function Repository({ match }) {
  return (
    <>
      <h1>Repository: {decodeURIComponent(match.params.repo)}</h1>
    </>
  );
}
