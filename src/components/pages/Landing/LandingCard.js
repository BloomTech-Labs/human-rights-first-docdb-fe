import React from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import bookmarkOutlined from '../../../assets/bookmarkOutlined.png';
import bookmarkFilled from '../../../assets/bookmarkFilled.png';

const { Meta } = Card;

function LandingCard(props) {
  const { title, preview, tags, favorited } = props;

  return (
    <Card
      title={<ArrowsAltOutlined rotate={90} />}
      cover={<img src={preview} alt={title} />}
      extra={
        favorited ? (
          <img src={bookmarkFilled} alt="bookmark filled" width="20" />
        ) : (
          <img src={bookmarkOutlined} alt="bookmark outlined" width="20" />
        )
      }
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
            <Col
              key={tag}
              span={0}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Tag> {tag} </Tag>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export default LandingCard;
