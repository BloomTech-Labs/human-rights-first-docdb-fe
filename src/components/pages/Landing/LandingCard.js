import React from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { StarOutlined, StarFilled, ArrowsAltOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Meta } = Card;

function LandingCard(props) {
  const { title, preview, tags, favorited } = props;

  return (
    <Card
      title={<ArrowsAltOutlined />}
      cover={<img src={preview} alt={title} />}
      extra={
        favorited ? (
          <StarFilled data-testid="filled-star" />
        ) : (
          <StarOutlined data-testid="outlined-star" />
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
        {tags.map(tag => (
          <Col span={0} style={{ display: 'flex', justifyContent: 'center' }}>
            <Tag key={tag} data-testid="doc-tag">
              {' '}
              {tag}{' '}
            </Tag>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

LandingCard.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  favorited: PropTypes.bool.isRequired,
};

export default LandingCard;
