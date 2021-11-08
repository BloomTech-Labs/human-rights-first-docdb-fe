import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

function RenderLandingPage(props) {
  return (
    <div>
      <Header />
      <div>
        <h1>Welcome to Labs Basic SPA</h1>
        <div>
          <p>
            This is an example of how we'd like for you to approach
            page/routable components.
          </p>
          <p>
            <Link to="/document-list">Documents</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RenderLandingPage;
