import React from 'react';
import bookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import bookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Tags } from '../../common';

const { Meta } = Card;
const thumbUrl = `${process.env.REACT_APP_DS_API_URI}/thumbnail`;

function LandingCardList(props) {
  const { name, url, box_id, tags, favorited, path } = props;

  return (
    <div>
      <Card
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
        style={{ width: '100%' }}
        bodyStyle={{ padding: '12px' }}
      >
        <div onClick={() => window.open(url)}>
          <div>
            <img
              onClick={() => window.open(url)}
              src={`${thumbUrl}/${box_id}`}
              alt={name}
            />
          </div>
          <Meta
            title={name}
            description={path}
            style={{ textAlign: 'center', marginBottom: '10px' }}
          />
        </div>
        <Tags tagArray={tags} size={10} />
      </Card>
    </div>
  );
}
LandingCardList.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  // favorited: PropTypes.bool.isRequired,
};
export default LandingCardList;
