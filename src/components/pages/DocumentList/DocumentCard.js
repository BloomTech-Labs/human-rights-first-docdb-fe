import React from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import bookmarkOutlined from '../../../assets/bookmarkOutlined.png';
import bookmarkFilled from '../../../assets/bookmarkFilled.png';
import PropTypes from 'prop-types';

const { Meta } = Card;

function DocumentCard(props) {
  const { title, preview, tags, favorited } = props;

  return (
    <Card
      key={title}
      title={<ArrowsAltOutlined rotate={90} />}
      cover={<img src={preview} alt={title} />}
      extra={
        favorited ? (
          <img
            src={bookmarkFilled}
            alt="bookmark filled"
            width="20"
            data-testid="filled-bookmark"
          />
        ) : (
          <img
            src={bookmarkOutlined}
            alt="bookmark outlined"
            width="20"
            data-testid="outlined-bookmark"
          />
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
          <Col
            key={tag}
            span={0}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Tag data-testid="doc-tag"> {tag} </Tag>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  favorited: PropTypes.bool.isRequired,
};

export default DocumentCard;
