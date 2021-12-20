import React, { useState, useEffect } from 'react';
import Querystring from 'querystring';
import { connect } from 'react-redux';
import { Modal, Input as Add, Tag, Tooltip } from 'antd';
import { handleModal, setDocTags, addCustomTag } from '../../state/actions';

function TagModal(props) {
  const { openModal, handleModal, setDocTags, docTags, addCustomTag } = props;

  const [modalState, setModalState] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [markForDeletion, setMarkForDeletion] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setModalState(docTags.tags);
  }, [docTags]);

  const handleOk = () => {
    //push local tag state to update tags in store
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
    //invoke action to make api call w/ file_id & tagToAdd to DS add tag endpoint
    addCustomTag(body);
    //setModalState([...modalState, newTag]); //this update isn't needed once updating store
    setNewTag('');
  };

  const handleDelete = e => {
    console.log(e.target, e.target.value);
    setMarkForDeletion(e.target.value);
    console.log(markForDeletion);
    setConfirmDelete(true);
  };

  const handleDeleteConfirmed = () => {
    //invoke action to make api call w/ file_id & tagToDelete to DS delete tag endpoint
    setModalState(
      modalState.filter(tags => {
        // this filter isn't needed once updating store
        return tags !== markForDeletion;
      })
    );
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
      okText="Done"
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Add
        placeholder="Add new tag..."
        onPressEnter={handleAdd}
        value={newTag}
        onChange={changeHandler}
      />
      {docTags
        ? docTags.tags.map(tag => (
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
          ))
        : null}
      <Modal
        title="Confirm Deletion"
        visible={confirmDelete}
        onOk={handleDeleteConfirmed}
        onCancel={handleDeleteCancel}
      >
        <div>Are you sure you would like to delete the tag:</div>
        <div>{`"${markForDeletion}"?`}</div>
      </Modal>
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
})(TagModal);
