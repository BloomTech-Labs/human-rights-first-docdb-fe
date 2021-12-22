import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ColTagList from '../ColTag/ColTagList';
import '../ColTag/ColTagList.css';

function TagsList(props) {
  const { size, tagArray } = props;

  if (tagArray.length <= size)
    return (
      <Row>
        {tagArray.map((tag, index) => (
          <ColTagList classList="colTag" tag={tag} key={index} />
        ))}
      </Row>
    );

  const shownTags = tagArray.slice(0, size - 1);
  const hiddenTags = tagArray.slice(size - 1, tagArray.length);

  return (
    <Row className="tagsListRow">
      {shownTags.map((tag, index) => (
        <ColTagList classList="colTag" tag={tag} key={index} />
      ))}
      <Col
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          margin: '0 auto 2% auto',
        }}
      >
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
