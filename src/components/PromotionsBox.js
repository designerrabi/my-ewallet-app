// src/components/PromotionsBox.js
import React from 'react';

function PromotionsBox() {
  return (
    <div className="section">
      <div className="promotions-box">
        <div className="left">
          {/* SVG Icon - you can put your icon here */}
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.4999 12.3749L12.5 5.50004L5.50005 12.3749C4.55776 11.805 4.00005 10.7499 4.00005 9.49994C4.00005 7.567 5.56706 6.00004 7.50005 6.00004C8.9409 6.00004 10.2111 6.81238 10.9509 8.00004H13.0492C13.7889 6.81238 15.0592 6.00004 16.5 6.00004C18.433 6.00004 20 7.567 20 9.49994C20 10.7499 19.4423 11.805 18.5 12.3749H19.4999V12.3749ZM11 14V20H13V14H11ZM9 14V20H2V14H9ZM22 14V20H15V14H22ZM12 3C12.5523 3 13 3.44772 13 4V4.93817C14.2494 5.3435 15.1566 6.2506 15.5618 7.5H16.5C17.0523 7.5 17.5 7.94772 17.5 8.5C17.5 8.97171 17.1852 9.37681 16.7492 9.47171L16.75 9.5H16.5C16.5 9.77614 16.2762 10 16 10H8C7.72386 10 7.5 9.77614 7.5 9.5H7.25L7.25084 9.47171C6.81483 9.37681 6.5 8.97171 6.5 8.5C6.5 7.94772 6.94772 7.5 7.5 7.5H8.43822C8.84345 6.2506 9.75064 5.3435 11 4.93817V4C11 3.44772 11.4477 3 12 3Z"></path></svg>
          <span>Promotions</span>
        </div>
        <div className="right">
          <span>নরমাল</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>
    </div>
  );
}

export default PromotionsBox;