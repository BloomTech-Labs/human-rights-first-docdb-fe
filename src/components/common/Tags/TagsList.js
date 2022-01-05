import React from 'react';
import { Row } from 'antd';
import ColTagList from '../ColTag/ColTagList';
import '../ColTag/ColTagList.css';

function TagsList(props) {
  const { tagArray } = props;
  return (
    <Row>
      {tagArray.map((tag, index) => (
        <ColTagList classList="colTag" tag={tag} key={index} />
      ))}
    </Row>
  );
}

export default TagsList;
