import React, { useState, useEffect } from 'react';
import LandingCard from './LandingCard';
import LandingListCard from './LandingListCard';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';

function LandingCardList(props) {
  const { docs, cardView, total } = props;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    console.log('page: ', page, ' page size: ', pageSize);
  }, [page, pageSize]);
  return (
    <>
      <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
        {docs ? (
          cardView ? (
            //For the Thumbnail Display
            docs.map(doc => (
              <Col className="gutter-row" span={6} key={doc.box_id}>
                <LandingCard {...doc} />
              </Col>
            ))
          ) : (
            //For the List Display
            docs.map(doc => (
              <Col className="gutter-row" span={19} key={doc.box_id}>
                <LandingListCard {...doc} />
              </Col>
            ))
          )
        ) : (
          <div> no results </div>
        )}
      </Row>
      <Pagination
        current={page}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        total={total}
        pageSizeOptions={[10, 25, 50]}
        hideOnSinglePage={true}
      />

      {/* @API.post("/search")
          async def search(query: str, page_number: int = 0, results_per_page: int = 100):
            start = page_number * results_per_page
            stop = start + results_per_page
            search_results = API.db.search(query)[start:stop]
            count = API.db.count({"$text": {"$search": query}})
            n_pages = ceil(count / results_per_page)

            return {"Pages": n_pages, "Count": count, "Response": list(search_results)} 
            
            
         Example Request URL: http://127.0.0.1:8000/search?query=bullet&page_number=0&results_per_page=10   
        
         ReactDOM.render(<Pagination defaultCurrent={6} total={500} />, mountNode);
      */}
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs,
  cardView: state.cardView,
  total: state.totalDocsCount,
});

export default connect(mapStateToProps)(LandingCardList);
