import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import BookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import BookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import { TagsList } from '../../common';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import {
  removeBookmarks,
  saveBookmarks,
} from '../../../state/actions/bookmarks';

const { Meta } = Card;
const thumbUrl = `${process.env.REACT_APP_DS_API_URI}/thumbnail`;

function LandingCardList(props) {
  const {
    name,
    url,
    box_id,
    path,
    tags,
    bookmarkedDocs,
    saveBookmarks,
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
    <div>
      <Card
        style={{ marginBottom: '3%' }}
        //Separate each card
      >
        <div
          //This is to make the contents in the card horizontal
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '15%', margin: 'auto' }}>
            <img
              onClick={() => window.open(url)}
              src={`${thumbUrl}/${box_id}`}
              alt={name}
              fallback={`${thumbUrl}/${box_id}`}
              style={{ width: '100%', margin: 'auto' }}
            />
          </div>
          <div style={{ width: '60%' }}>
            <Meta
              title={name}
              description={path}
              style={{ textAlign: 'center', marginBottom: '10px' }}
            />
            <TagsList tagArray={tags} size={8} />
          </div>
          {/* To place the bookmark on the top right corner */}
          <div style={{ alignSelf: 'flex-start', marginLeft: '10%' }}>
            <img
              src={isFavorite ? BookmarkFilled : BookmarkOutlined}
              alt={isFavorite ? 'bookmark filled' : 'bookmark outlined'}
              width={50}
              data-testid={isFavorite ? 'filled-bookmark' : 'outlined-bookmark'}
              onClick={isFavorite ? handleRemove : handleSave}
              style={{ right: 5, top: 5, position: 'absolute' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
LandingCardList.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  // isFavorite: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
});

export default connect(mapStateToProps, { removeBookmarks, saveBookmarks })(
  LandingCardList
);
