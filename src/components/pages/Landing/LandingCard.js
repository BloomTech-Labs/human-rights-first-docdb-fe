import React from 'react';
import { Card, Tag, Grid } from 'antd';
import { StarOutlined, StarFilled, ArrowsAltOutlined } from '@ant-design/icons';

const { Meta } = Card;

function LandingCard(props) {
  const { title, preview, tags } = props;
  return (
    <Card
      title={<ArrowsAltOutlined />}
      cover={<img src={preview} alt={title} />}
      extra={<StarOutlined />}
    >
      <Meta title={title}></Meta>
      {tags.map(tag => {
        return <Tag key={tag}> {tag} </Tag>;
      })}
    </Card>
  );
}

export default LandingCard;
