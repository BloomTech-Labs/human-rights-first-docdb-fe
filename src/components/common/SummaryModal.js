import React, { useState } from 'react';
import { Modal } from 'antd';
import { AlignCenterOutlined as Summary } from '@ant-design/icons';
import Button from './Stock/Button';

const SummaryModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { name, summary } = props;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Summary onClick={showModal} />

      <Modal
        title={name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <p>{summary}</p>
      </Modal>
    </>
  );
};

export default SummaryModal;
