import React from 'react';
import { Col, Tag, Tooltip } from 'antd';

function ColTag(props) {
  const { tag } = props;

  return (
    <Col
      key={tag}
      span={6}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Tag data-testid="doc-tag">
        {tag.length < 8 ? (
          tag
        ) : (
          <Tooltip title={tag}>{tag.slice(0, 6)}...</Tooltip>
        )}
      </Tag>
    </Col>
  );
}

export default ColTag;
