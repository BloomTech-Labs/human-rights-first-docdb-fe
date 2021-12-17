import React from 'react';
import { Col, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { searchDocs, setCurrentSearch } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

function ColTag(props) {
  const { searchDocs, tag, page, pageSize } = props;
  const { authState } = useOktaAuth();

  return (
    <Col
      key={tag}
      span={6}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Tag
        style={{ cursor: 'pointer' }}
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState, 1, pageSize);
          setCurrentSearch(tag, 1, props.pageSize);
        }}
      >
        {tag.length < 8 ? (
          tag
        ) : (
          <Tooltip title={tag}>{tag.slice(0, 6)}...</Tooltip>
        )}
      </Tag>
    </Col>
  );
}

const mapStateToProps = state => ({
  page: state.bookmarks.page,
  pageSize: state.searches.pageSize,
});

export default connect(mapStateToProps, { searchDocs, setCurrentSearch })(
  ColTag
);
