import React, { useState, useEffect } from 'react';
import Querystring from 'querystring';
import { connect } from 'react-redux';
import { Modal, Input as Add, Tag, Tooltip, Row, Col, Button } from 'antd';
import {
  handleModal,
  setDocTags,
  addCustomTag,
  deleteTag,
} from '../../state/actions';

function TagModal(props) {
  const {
    openModal,
    handleModal,
    setDocTags,
    docTags,
    addCustomTag,
    deleteTag,
  } = props;

  const [newTag, setNewTag] = useState('');
  const [markForDeletion, setMarkForDeletion] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDone = () => {
    handleModal();
  };

  const handleCancel = () => {
    handleModal();
    setDocTags({});
  };

  const changeHandler = e => {
    setNewTag(e.target.value);
  };

  const handleAdd = e => {
    e.preventDefault();
    const body = Querystring['stringify']({
      file_id: docTags.file_id,
      tag: newTag,
    });
    addCustomTag(body);
    setNewTag('');
  };

  const handleDelete = e => {
    setMarkForDeletion(e.target.value);
    setConfirmDelete(true);
  };

  const handleDeleteConfirmed = () => {
    const body = Querystring['stringify']({
      file_id: docTags.file_id,
      tag: markForDeletion,
    });
    deleteTag(body);
    setConfirmDelete(false);
    setMarkForDeletion('');
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setMarkForDeletion('');
  };

  return (
    <Modal
      title="Create and Edit Tags"
      visible={openModal}
      centered="true"
      okText="Done"
      onOk={handleDone}
      onCancel={handleCancel}
      okButtonProps={{
        style: {
          backgroundColor: '#F3F3F3',
          color: '#000',
          borderColor: '#CCC',
        },
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Row justify="center" gutter={[16, 16]}>
        <Col span={19}>
          <Add
            placeholder="Add new tag..."
            onPressEnter={handleAdd}
            value={newTag}
            onChange={changeHandler}
          />
        </Col>
      </Row>
      <Row gutter={[0, 5]}>
        {docTags.tags
          ? docTags.tags.map(tag => (
              <Col>
                <Tag>
                  {tag}
                  <Tooltip title="click to confirm tag deletion">
                    <button
                      style={{
                        border: 'none',
                        paddingLeft: '10px',
                        backgroundColor: '#F8F8F8',
                        cursor: 'pointer',
                      }}
                      type="text"
                      value={tag}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                  </Tooltip>
                </Tag>
              </Col>
            ))
          : null}
      </Row>
      {confirmDelete ? (
        <Row justify="center" align="bottom" gutter={[16, 8]}>
          <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Are you sure you would like to delete the tag{' '}
            {`"${markForDeletion}"?`}
          </Col>
          <Col>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
          </Col>
          <Col>
            <Button onClick={handleDeleteConfirmed}>Confirm Deletion</Button>
          </Col>
        </Row>
      ) : null}
    </Modal>
  );
}

const mapStateToProps = state => ({
  openModal: state.openModal,
  docTags: state.docTags,
});

export default connect(mapStateToProps, {
  handleModal,
  setDocTags,
  addCustomTag,
  deleteTag,
})(TagModal);
