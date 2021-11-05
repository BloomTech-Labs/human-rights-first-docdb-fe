import React from 'react';
import { Col, Tag, Tooltip } from 'antd';

function ColTag(props) {
  const { tag } = props;

  return (
    <Col span={0} style={{ display: 'flex', justifyContent: 'center' }}>
      <Tag key={tag} data-testid="doc-tag">
        {' '}
        {tag}{' '}
      </Tag>
    </Col>
  );
}

export default ColTag;
