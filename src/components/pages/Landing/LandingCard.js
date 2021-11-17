import React from 'react';
import { Card } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import bookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import bookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import { Tags } from '../../common';
import './LandingCard.css';

const { Meta } = Card;
const thumbUrl = `${process.env.REACT_APP_DS_API_URI}/thumbnail`;

function LandingCard(props) {
  const { name, url, box_id, tags, favorited } = props;

  return (
    <div onClick={() => window.open(url)}>
      <Card
        name={<ArrowsAltOutlined rotate={90} />}
        cover={<img src={`${thumbUrl}/${box_id}`} alt={name} />}
        extra={
          favorited ? (
            <img
              src={bookmarkFilled}
              alt="bookmark filled"
              width="50"
              data-testid="filled-bookmark"
            />
          ) : (
            <img
              src={bookmarkOutlined}
              alt="bookmark outlined"
              width="50"
              data-testid="outlined-bookmark"
            />
          )
        }
        style={{ width: 300 }}
        bodyStyle={{ padding: '12px' }}
      >
        <Meta
          title={name}
          style={{ textAlign: 'center', marginBottom: '10px' }}
        />
        <Tags tagArray={tags} size={8} />
      </Card>
    </div>
  );
}

LandingCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  // favorited: PropTypes.bool.isRequired,
};

export default LandingCard;
