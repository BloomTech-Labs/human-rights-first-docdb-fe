import React from 'react';
import { Card, Collapse, Col, Row, Tooltip } from 'antd';
import {
  DiffOutlined as EditTags,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import BookmarkOutlined from '../../../assets/OutlineBookMark.svg';
import BookmarkFilled from '../../../assets/FilledBookMark.svg';
import PropTypes from 'prop-types';
import Tags from '../../common/Tags/Tags';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { downloadTextDS } from '../../../api';
import { connect } from 'react-redux';
import {
  removeBookmarks,
  saveBookmarks,
} from '../../../state/actions/bookmarks';
import {
  handleModal,
  setDocTags,
  downloadText,
} from '../../../state/actions/docs';
import SummaryModal from '../../common/SummaryModal';
import './LandingCard.css';

const { Meta } = Card;
const { Panel } = Collapse;
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
    handleModal,
    setDocTags,
    summary,
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

  const loadTagModal = () => {
    setDocTags({
      file_id: box_id,
      tags: tags,
    });
    handleModal();
  };

  const handleDownload = () => {
    downloadTextDS(`/raw_text/${box_id}`, name);
  };

  return (
    <>
      {cardView ? (
        // displays the results in card view
        <Card
          title={
            <Row style={{ marginLeft: 15 }}>
              <Col
                span={18}
                style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {name}
              </Col>
              <Col span={6}>
                <img
                  style={{ right: -5, top: -10, position: 'absolute' }}
                  src={isFavorite ? BookmarkFilled : BookmarkOutlined}
                  alt={isFavorite ? 'Bookmark filled' : 'Bookmark outlined'}
                  width={50}
                  data-testid={
                    isFavorite ? 'filled-bookmark' : 'outlined-bookmark'
                  }
                  onClick={isFavorite ? handleRemove : handleSave}
                />
              </Col>
            </Row>
          }
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
          style={{
            width: 300,
            marginBottom: '17%',
            border: '1px solid #DAC6B2',
          }}
          headStyle={{ height: 35, padding: 0 }}
          bodyStyle={{ padding: 12 }}
          hoverable={true}
        >
          <Row wrap="false">
            <Col span={2}>
              <Row style={{ marginTop: 2, marginBottom: 8 }}>
                <Tooltip title="Document Summary">
                  <SummaryModal name={name} summary={summary} />
                </Tooltip>
              </Row>
              <Row>
                <Tooltip title="Add/Edit Tags">
                  <EditTags
                    style={{ fontSize: 18, cursor: 'pointer' }}
                    onClick={loadTagModal}
                  />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 8 }}>
                <Tooltip title="Dowload Raw Text" onClick={handleDownload}>
                  <CloudDownloadOutlined />
                </Tooltip>
              </Row>
            </Col>
            <Col span={22}>
              <Tags tagArray={tags} size={8} />
            </Col>
          </Row>
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
                width: '100%',
                margin: 'auto',
                padding: '1rem',
                minWidth: 180,
                minHeight: 140,
              }}
            />
          }
          // extra={
          //   <img
          //     src={isFavorite ? BookmarkFilled : BookmarkOutlined}
          //     alt={isFavorite ? 'bookmark filled' : 'bookmark outlined'}
          //     width={50}
          //     data-testid={isFavorite ? 'filled-bookmark' : 'outlined-bookmark'}
          //     onClick={isFavorite ? handleRemove : handleSave}
          //     style={{ right: 5, top: 5, position: 'absolute' }}
          //   />
          // }
          style={{
            width: '60vw',
            display: 'flex',
            justifyContent: 'left',
            marginBottom: '3%',
            border: '1px solid #DAC6B2',
          }}
          bodyStyle={{ overflow: 'auto', whiteSpace: 'normal' }}
          hoverable={true}
        >
          <img
            src={isFavorite ? BookmarkFilled : BookmarkOutlined}
            alt={isFavorite ? 'bookmark filled' : 'bookmark outlined'}
            width={50}
            data-testid={isFavorite ? 'filled-bookmark' : 'outlined-bookmark'}
            onClick={isFavorite ? handleRemove : handleSave}
            style={{ right: 5, top: 5, position: 'absolute' }}
          />
          <Meta
            title={name}
            description={path}
            style={{ marginBottom: '10px' }}
          />
          <Collapse defaultActiveKey={['0']} ghost>
            <Panel header="Summary" key="1">
              <p>{summary}</p>
            </Panel>
          </Collapse>
          <Tags tagArray={tags} size={8} />
          <Tooltip title="Add/Edit Tags">
            <EditTags
              style={{ fontSize: 18, cursor: 'pointer' }}
              onClick={loadTagModal}
            />
          </Tooltip>
        </Card>
      )}
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

export default connect(mapStateToProps, {
  saveBookmarks,
  removeBookmarks,
  handleModal,
  setDocTags,
})(LandingCard);
