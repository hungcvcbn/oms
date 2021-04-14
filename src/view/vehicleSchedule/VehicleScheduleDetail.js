import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { Button } from 'antd';
import './VehicleSchedule.scss';
import { actionToggleMenu } from '../system/systemAction';
import { getScheduleDetail } from './VehicleScheduleActions';
import { getLangCode, isEmpty } from 'utils/helpers/helpers';
import Layout from 'components/layout/Layout';
import { routes } from 'utils/constants/constants';
import { Fragment } from 'react';

const VehicleScheduleDetail = (props) => {
  const [dataDetail, setDataDetail] = useState({});
  const { id } = props.match.params;
  const paramsUrl = queryString.parse(props.location.search);
  const fetchData = async () => {
    try {
      const { data } = await getScheduleDetail({
        lang_code: getLangCode(props.locale),
        is_favorite_category: paramsUrl.type === 'categories' ? 0 : 1,
        id,
      });

      if (!isEmpty(data.data)) setDataDetail(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, [id]);
  const handleBack = () => {
    props.history.push(routes.VEHICLE_SCHEDULE);
  };
  const { category, suppliers } = dataDetail;
  return (
    <Layout>
      <div className="header-container vehicle-detail">
        <span className="title-info">
          {!isEmpty(category) ? category.name : ''}
        </span>
      </div>
      <div className="page-content vehicle-detail">
        <div className="header-group">
          <div className="items-column">
            <FormattedMessage id="IDS_ITEMS" />
          </div>
          <div className="vehicle-column">
            <FormattedMessage id="IDS_VEHICLE_SCHEDULE" />
          </div>
          <div className="order-column">
            <FormattedMessage id="IDS_ORDER_BEFORE" />
          </div>
        </div>
        <>
          {!isEmpty(suppliers) &&
            suppliers.map((el, i) => (
              <Fragment key={i}>
                <p className="title-vehicle-item">{el.name}</p>
                {!isEmpty(el.items) &&
                  el.items.map((item, idx) => (
                    <div className="header-group vehicle-item" key={idx}>
                      <div className="items-column">
                        <span
                          style={{
                            fontSize: 14,
                            lineHeight: '21px',
                            marginBottom: 2,
                          }}
                        >
                          {item.code}
                        </span>
                        <span
                          style={{
                            fontSize: 18,
                            lineHeight: '27px',
                            fontWeight: 600,
                          }}
                        >
                          {item.name}&nbsp;
                          {item.pack_weight}
                        </span>
                      </div>
                      <div className="vehicle-column">
                        <span className="value-item">
                          {item.vehicle_schdules}
                        </span>
                      </div>
                      <div className="order-column">
                        <span className="value-item">
                          {item.order_before_day}
                        </span>
                      </div>
                    </div>
                  ))}
              </Fragment>
            ))}
        </>
      </div>
      <div className="page-footer">
        <Button className="footer-btn" onClick={handleBack}>
          <FormattedMessage id="IDS_BACK" />
        </Button>
      </div>
    </Layout>
  );
};

export default connect(
  (state) => ({
    locale: state.system.locale,
  }),
  { actionToggleMenu }
)(withRouter(VehicleScheduleDetail));