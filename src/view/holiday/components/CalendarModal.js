import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Modal } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';
import * as icons from 'assets';
import { isEmpty } from 'utils/helpers/helpers';
import moment from 'moment';

import CalendarCustom from 'components/calendarCustom/CalendarCustom';

const CalendarModal = (props) => {
  const intl = useIntl();
  const { handleClose } = props;
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleReset = () => {};
  const handleSave = () => {
    handleClose();
  };

  return (
    <Modal
      visible={true}
      title={null}
      closeIcon={<img src={icons.ic_close} alt="" />}
      onOk={handleClose}
      onCancel={handleClose}
      className="modal-container"
      width={476}
      footer={null}
    >
      <div className="modal-filter-content">
        <CalendarCustom
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="filter-footer">
          <Button className="outline-btn" onClick={handleReset}>
            <FormattedMessage id="IDS_RESET" />
          </Button>
          <Button className="primary-btn" onClick={handleSave}>
            <FormattedMessage id="IDS_DONE" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;
