import React from 'react';
import { Col, Tag } from 'antd';
import { connect } from 'react-redux';
import { searchDocs, setCurrentSearch } from '../../../state/actions/searches';
import { useOktaAuth } from '@okta/okta-react';

function ColTagList(props) {
  const { searchDocs, tag, pageSize } = props;
  const { authState } = useOktaAuth();

  return (
    <Col key={tag} flex={'0 0 auto'} className="columnTag">
      <Tag
        className="innerTag"
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState, 1, pageSize);
          setCurrentSearch(tag, 1, pageSize);
        }}
      >
        {tag}
      </Tag>
    </Col>
  );
}
const mapStateToProps = state => ({
  pageSize: state.searches.pageSize,
});

export default connect(mapStateToProps, { searchDocs, setCurrentSearch })(
  ColTagList
);
