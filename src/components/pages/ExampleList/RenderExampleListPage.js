import React from 'react';
import PropTypes from 'prop-types';

const RenderExampleListPage = props => {
  const { data } = props;
  return (
    <div>
      {data.map(item => (
        <ExampleComponent {...item} />
      ))}
    </div>
  );
};

const ExampleComponent = props => {
  const { id, thumbnailUrl, title } = props;
  return (
    <figure key={id}>
      <img src={thumbnailUrl} alt={title} />
      <figcaption>
        <h3>{title}</h3>
      </figcaption>
    </figure>
  );
};

export default RenderExampleListPage;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderExampleListPage.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      url: PropTypes.string,
      thumbnailUrl: PropTypes.string,
    })
  ).isRequired,
};
