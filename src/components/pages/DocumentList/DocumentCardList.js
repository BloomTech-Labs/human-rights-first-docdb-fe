import React from 'react';
import DocumentCard from './DocumentCard';
import { connect } from 'react-redux';

function DocmentCardList(props) {
  const { docs } = props;
  return (
    <div>
      {docs.map(doc => (
        <DocumentCard {...doc} />
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
});

export default connect(mapStateToProps)(DocmentCardList);
