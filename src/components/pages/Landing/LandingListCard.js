import React from 'react';
import { connect } from 'react-redux';

import { Card } from 'antd';
import bookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import bookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import { TagsList } from '../../common';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { saveBookmarks } from '../../../state/actions';

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

  return (
    <div>
      <Card>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '30%' }}>
            <img
              onClick={() => window.open(url)}
              src={`${thumbUrl}/${box_id}`}
              alt={name}
              fallback={`${thumbUrl}/${box_id}`}
              style={{ height: 300, marginLeft: 'auto' }}
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
          <div style={{ alignSelf: 'flex-start' }}>
            {isFavorite ? (
              <img
                src={bookmarkFilled}
                alt="bookmark filled"
                width="50"
                data-testid="filled-bookmark"
                onClick={handleSave}
              />
            ) : (
              <img
                src={bookmarkOutlined}
                alt="bookmark outlined"
                width="50"
                data-testid="outlined-bookmark"
                onClick={handleSave}
              />
            )}
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
  isFavorite: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  bookmarkedDocs: state.bookmarkedDocs,
});

export default connect(mapStateToProps, { saveBookmarks })(LandingCardList);
