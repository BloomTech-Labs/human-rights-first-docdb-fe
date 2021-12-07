import React from 'react';
import { Col, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { searchDocs } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

function ColTag(props) {
  const { searchDocs, tag } = props;
  const { authState } = useOktaAuth();

  return (
    <Col
      key={tag}
      span={6}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Tag
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState);
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

export default connect(null, { searchDocs })(ColTag);
