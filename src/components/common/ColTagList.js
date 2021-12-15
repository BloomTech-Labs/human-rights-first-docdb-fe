import React from 'react';
import { Col, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { searchDocs } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

function ColTagList(props) {
  const { searchDocs, tag } = props;
  const { authState } = useOktaAuth();

  return (
    <Col key={tag} span={6} className="columnTag">
      <Tag
        className="innerTag"
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState);
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

export default connect(null, { searchDocs })(ColTagList);
