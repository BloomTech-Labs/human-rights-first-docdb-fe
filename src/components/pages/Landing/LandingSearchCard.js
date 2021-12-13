import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

function LandingSearchCard(props) {
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default LandingSearchCard;
