import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { handleModal } from '../../state/actions';

function TagModal(props) {
  const { openModal, handleModal } = props;

  const handleOk = () => {
    //push local tag state to update tags in store
  };

  return (
    <Modal
      title="Create and Edit Tags"
      visible={openModal}
      okText="Save Changes"
      onOk={handleOk}
      onCancel={handleModal}
    ></Modal>
  );
}

const mapStateToProps = state => ({
  openModal: state.openModal,
});

export default connect(mapStateToProps, { handleModal })(TagModal);
