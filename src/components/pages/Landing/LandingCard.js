import React from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { StarOutlined, StarFilled, ArrowsAltOutlined } from '@ant-design/icons';

const { Meta } = Card;

function LandingCard(props) {
  const { title, preview, tags } = props;
  return (
    <Card
      title={<ArrowsAltOutlined />}
      cover={<img src={preview} alt={title} />}
      extra={<StarOutlined />}
      style={{ width: 300 }}
      bodyStyle={{ padding: '12px' }}
    >
      <Meta
        title={title}
        style={{ textAlign: 'center', marginBottom: '10px' }}
      />
      <Row>
        {tags.map(tag => {
          return (
            <Col span={0} style={{ display: 'flex', justifyContent: 'center' }}>
              <Tag key={tag}> {tag} </Tag>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export default LandingCard;
