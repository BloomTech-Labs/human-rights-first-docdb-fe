import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ColTag from '../ColTag/ColTag';

function Tags(props) {
  const { size, tagArray } = props;

  if (tagArray.length <= size)
    return (
      <Row align="middle" justify="start" gutter={[0, 5]}>
        {tagArray.map((tag, index) => (
          <Col span={6}>
            <ColTag tag={tag} key={index} />
          </Col>
        ))}
      </Row>
    );

  const shownTags = tagArray.slice(0, size - 2);
  const hiddenTags = tagArray.slice(size - 2, tagArray.length);

  return (
    <Row align="middle" justify="start" gutter={[0, 5]}>
      {shownTags.map((tag, index) => (
        <ColTag tag={tag} key={index} />
      ))}
      <Col offset={1}>
        <Popover
          title="Tags cont."
          content={
            <Row>
              {hiddenTags.map((tag, index) => (
                <ColTag tag={tag} key={index} />
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
