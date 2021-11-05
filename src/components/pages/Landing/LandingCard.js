import React from 'react';
import { Card } from 'antd';
import { StarOutlined, StarFilled, ArrowsAltOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Tags } from '../../common';

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
      <Tags tagArray={tags} size={5} />
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
