import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ColTag } from './';

function Tags(props) {
  const { size, tagArray } = props;
  return (
    <Row>
      {/*eslint-disable-next-line*/}
      {tagArray.map((tag, index) => {
        if (index < size - 1) {
          return <ColTag tag={tag} />;
        } else if (index === size - 1 && tagArray.length <= size) {
          return <ColTag tag={tag} />;
        } else if (index === size - 1) {
          return (
            <Col>
              <Popover
                title="Tags cont."
                // eslint-disable-next-line
                content={tagArray.map((tag, index) => {
                  if (index >= size - 1) {
                    return <ColTag tag={tag} />;
                  }
                })}
              >
                <Tag>
                  <EllipsisOutlined />
                </Tag>
              </Popover>
            </Col>
          );
        }
      })}
    </Row>
  );
}

export default Tags;
