import React from 'react';
import { Card } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { ReactComponent as BookmarkOutlined } from '../../../assets/OutlineBookMark.svg';
import { ReactComponent as BookmarkFilled } from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import { Tags } from '../../common';
import './LandingCard.css';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { connect } from 'react-redux';
import { saveBookmarks } from '../../../state/actions';

const { Meta } = Card;
const thumbUrl = `${process.env.REACT_APP_DS_API_URI}/thumbnail`;

function LandingCard(props) {
  const { name, url, box_id, tags, bookmarkedDocs, saveBookmarks } = props;
  const { authState } = useOktaAuth();

  let isFavorite = false;
  if (bookmarkedDocs.includes(box_id)) isFavorite = true;

  const handleSave = () => {
    saveBookmarks(authState, box_id);
  };

  return (
    <div>
      <Card
        name={<ArrowsAltOutlined rotate={90} />}
        cover={
          <img
            onClick={() => window.open(url)}
            src={`${thumbUrl}/${box_id}`}
            alt={name}
          />
        }
        extra={
          isFavorite ? (
            <BookmarkFilled onClick={handleSave} />
          ) : (
            <BookmarkOutlined />
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
  isFavorite: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  bookmarkedDocs: state.bookmarkedDocs,
});

export default connect(mapStateToProps, { saveBookmarks })(LandingCard);
