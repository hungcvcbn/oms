import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'antd';
import * as icons from 'assets';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionSnackBar } from 'view/system/systemAction';
import { createOrder } from '../FavouriteActions';
import IconLoading from 'components/icon-loading/IconLoading';

const SubmitOrderItemModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { handleClose } = props;

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await createOrder({});
      // props.actionSnackBar({
      //   open: true,
      //   type: 'success', //or success
      //   message: 'Today Order form created',
      // });
    } catch (error) {
    } finally {
      handleClose();
      setLoading(false);
      props.actionSnackBar({
        open: true,
        type: 'success', //or success
        message: 'Today Order form created',
      });
    }
  };
  return (
    <Modal
      visible={true}
      title={null}
      closeIcon={
        <img src={icons.ic_close} alt="" style={{ display: 'none' }} />
      }
      onOk={handleClose}
      onCancel={handleClose}
      className="modal-container"
      width={476}
      footer={null}
      centered
    >
      <div className="modal-filter-content">
        <p className="title-filter-text">
          <FormattedMessage id="IDS_SUBMIT" />
        </p>
        <p
          className="title-item"
          style={{
            color: '#4F4E66',
            fontWeight: 'normal',
            fontSize: 20,
            lineHeight: '30px',
            textAlign: 'center',
            padding: '8px 32px',
          }}
        >
          <FormattedMessage id="IDS_SUBMIT_ORDER_DESCRIPTION" />
        </p>
        {loading ? (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              padding: 32,
            }}
          >
            <IconLoading />
          </div>
        ) : (
          <div className="filter-footer" style={{ marginTop: 16 }}>
            <Button className="outline-btn" onClick={handleClose}>
              <FormattedMessage id="IDS_CANCEL" />
            </Button>
            <Button className="primary-btn" onClick={handleSave}>
              <FormattedMessage id="IDS_SAVE" />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default connect((state) => ({}), { actionSnackBar })(
  withRouter(SubmitOrderItemModal)
);
