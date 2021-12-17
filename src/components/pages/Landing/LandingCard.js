import React from 'react';
import { Card } from 'antd';
import BookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import BookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import Tags from '../../common/Tags/Tags';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { connect } from 'react-redux';
import {
  removeBookmarks,
  saveBookmarks,
} from '../../../state/actions/bookmarks';

const { Meta } = Card;
const thumbUrl = `${process.env.REACT_APP_DS_API_URI}/thumbnail`;

function LandingCard(props) {
  const {
    name,
    url,
    box_id,
    tags,
    bookmarkedDocs,
    saveBookmarks,
    removeBookmarks,
    cardView,
    path,
  } = props;
  const { authState } = useOktaAuth();

  let isFavorite = false;
  if (bookmarkedDocs.includes(box_id)) isFavorite = true;

  const handleSave = () => {
    saveBookmarks(authState, box_id);
  };

  const handleRemove = () => {
    removeBookmarks(authState, box_id);
  };

  return (
    <>
      {cardView ? (
        // displays the results in card view
        <Card
          cover={
            <img
              onClick={() => window.open(url)}
              src={`${thumbUrl}/${box_id}`}
              alt={name}
              fallback={`${thumbUrl}/${box_id}`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                height: 300,
              }}
            />
          }
          extra={
            <img
              src={isFavorite ? BookmarkFilled : BookmarkOutlined}
              alt={isFavorite ? 'bookmark filled' : 'bookmark outlined'}
              width={50}
              data-testid={isFavorite ? 'filled-bookmark' : 'outlined-bookmark'}
              onClick={isFavorite ? handleRemove : handleSave}
              style={{ right: 5, top: 5, position: 'absolute' }}
            />
          }
          style={{
            width: 300,
            marginBottom: '17%',
            border: '3px outset #DAC6B2',
          }}
        >
          <Meta
            title={name}
            style={{ textAlign: 'center', marginBottom: 10 }}
          />
          <Tags tagArray={tags} size={8} />
        </Card>
      ) : (
        // displays the results in list view
        <Card
          cover={
            <img
              onClick={() => window.open(url)}
              src={`${thumbUrl}/${box_id}`}
              alt={name}
              fallback={`${thumbUrl}/${box_id}`}
              style={{
                // width: '100%',
                // margin: 'auto',
                minWidth: 180,
                minHeight: 140,
              }}
            />
          }
          extra={
            <img
              src={isFavorite ? BookmarkFilled : BookmarkOutlined}
              alt={isFavorite ? 'bookmark filled' : 'bookmark outlined'}
              width={50}
              data-testid={isFavorite ? 'filled-bookmark' : 'outlined-bookmark'}
              onClick={isFavorite ? handleRemove : handleSave}
              style={{ right: 5, top: 5, position: 'absolute' }}
            />
          }
          style={{
            width: '60vw',
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3%',
          }}
        >
          <Meta
            title={name}
            description={path}
            style={{ textAlign: 'center', marginBottom: '10px' }}
          />
          <Tags tagArray={tags} size={8} />
        </Card>
      )}
      ;
    </>
  );
}

LandingCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFavorite: PropTypes.bool,
};

const mapStateToProps = state => ({
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
  cardView: state.docs.cardView,
});

export default connect(mapStateToProps, { saveBookmarks, removeBookmarks })(
  LandingCard
);
