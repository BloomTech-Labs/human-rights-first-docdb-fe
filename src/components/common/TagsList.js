import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ColTagList from './ColTagList';
import './ColTagList.css';

function TagsList(props) {
  const { size, tagArray } = props;

  if (tagArray.length <= size)
    return (
      <Row justify={'space-between'} gutter={['8', '8']}>
        {tagArray.map((tag, index) => (
          <ColTagList classList="colTag" tag={tag} key={index} />
        ))}
      </Row>
    );

  const shownTags = tagArray.slice(0, size - 1);
  const hiddenTags = tagArray.slice(size - 1, tagArray.length);

  return (
    <Row justify={'start'} gutter={['8', '8']}>
      {shownTags.map((tag, index) => (
        <ColTagList classList="colTag" tag={tag} key={index} />
      ))}
      <Col>
        <Popover
          title="Tags cont."
          classList="colTag"
          content={
            <Row>
              {hiddenTags.map((tag, index) => (
                <ColTagList tag={tag} key={index} />
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

export default TagsList;
