import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ColTag from './ColTag';

function Tags(props) {
  const { size, tagArray } = props;

  if (tagArray.length <= size)
    return (
      <Row>
        {tagArray.map(tag => (
          <ColTag tag={tag} />
        ))}
      </Row>
    );

  const shownTags = tagArray.slice(0, size - 1);
  const hiddenTags = tagArray.slice(size - 1, tagArray.length);

  return (
    <Row>
      {shownTags.map(tag => (
        <ColTag tag={tag} />
      ))}
      <Col>
        <Popover
          title="Tags cont."
          content={
            <Row>
              {hiddenTags.map(tag => (
                <ColTag tag={tag} />
              ))}
            </Row>
          }
        >
          <Tag>
            <EllipsisOutlined />
          </Tag>
        </Popover>
      </Col>
    </Row>
  );
}

export default Tags;
