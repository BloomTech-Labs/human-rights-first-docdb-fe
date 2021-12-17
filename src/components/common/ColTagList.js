import React from 'react';
import { Col, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { searchDocs, setCurrentSearch } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

function ColTagList(props) {
  const { searchDocs, tag, page, pageSize } = props;
  const { authState } = useOktaAuth();

  return (
    <Col key={tag} span={6} className="columnTag">
      <Tag
        className="innerTag"
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState, 1, pageSize);
          setCurrentSearch(tag, 1, pageSize);
        }}
      >
        {tag.length < 45 ? (
          tag
        ) : (
          <Tooltip title={tag}>{tag.slice(0, 16)}...</Tooltip>
        )}
      </Tag>
    </Col>
  );
}
const mapStateToProps = state => ({
  pageSize: state.pageSize,
});

export default connect(mapStateToProps, { searchDocs, setCurrentSearch })(
  ColTagList
);
