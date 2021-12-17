import React from 'react';
import { Col, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { searchDocs } from '../../state/actions';
import { useOktaAuth } from '@okta/okta-react';

function ColTagList(props) {
  const { searchDocs, tag } = props;
  const { authState } = useOktaAuth();

  return (
    <Col key={tag} flex={'0 0 auto'} className="columnTag">
      <Tag
        className="innerTag"
        data-testid="doc-tag"
        onClick={() => {
          searchDocs(tag, authState);
        }}
      >
        {tag.length < 45 ? (
          <p>{tag}</p>
        ) : (
          <Tooltip title={tag}>{tag.slice(0, 16)}...</Tooltip>
        )}
      </Tag>
    </Col>
  );
}

export default connect(null, { searchDocs })(ColTagList);
