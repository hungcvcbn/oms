import React, { useEffect } from 'react';
import './Login.scss';
import Logo from '../../assets/images/logo.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import ContainerLogin from '../../components/container-login/ContainerLogin';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { requestLogin } from './LoginService';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { notification } from 'antd';
import { routes, TOKEN } from '../../utils/constants/constants';
import { encrypt } from '../../utils/helpers/helpers';
import { actionSnackBar } from '../../view/system/systemAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Login = props => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showError400, setshowError400] = React.useState(false);
  const [values, setValues] = React.useState({
    username: '',
    password: ''
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = prop => event => {
    if (showError400) {
      setshowError400(false);
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickClearPassword = () => {
    setValues({ ...values, password: '' });
  };
  const handleLogin = async () => {
    setLoading(true);
    const encryptText = encrypt(values.password);
    try {
      const { data } = await requestLogin(values.username, encryptText);
      handleResultLogin(data);
    } catch (data) {
      handleResultLogin(data.data);
    }
  };
  const intl = useIntl();

  const openNotificationError = message => {
    notification['error']({
      message: intl.formatMessage({ id: 'IDS_ERROR' }),
      description: message
    });
  };
  const handleResultLogin = data => {
    let status = data && data.result && data.result.status;
    switch (status) {
      case 200:
        props.history.replace('/');
        localStorage.setItem(TOKEN, data && data.data.token);
        break;
      case 400:
        setshowError400(true);
        break;
      default:
        openNotificationError(data.result && data.result.message);
    }
    setLoading(false);
  };
  const redirectionPage = event => {
    props.history.push(event.target.id);
  };
  const openSnackBar = () => {
    props.actionSnackBar({
      open: true,
      type: 'warning', //or success
      message: 'This is a success message!'
    });
  };
  return (
    <ContainerLogin styleContainerForm={{ marginBottom: 124 }}>
      {/* logo */}
      <img src={Logo} alt="logo" className="logo" />
      {/* title signin */}
      <div className="title-signin">
        <FormattedMessage id="IDS_SIGNIN" />
      </div>

      <div className="input-field">
        <FormattedMessage id="IDS_PLACEHOLDER_EMAIL_OR_ID">
          {msg => (
            <TextField
              id="outlined-basic"
              label={<FormattedMessage id="IDS_EMAIL_OR_ID" />}
              placeholder={msg}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              onChange={handleChange('username')}
              helperText={
                showError400
                  ? intl.formatMessage({ id: 'IDS_INVALID_EMAIL_OR_PASSWORD' })
                  : null
              }
              error={showError400}
            />
          )}
        </FormattedMessage>
      </div>
      <div className="input-field">
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={showError400}
          >
            <FormattedMessage id="IDS_PASSWORD" />
          </InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            label={<FormattedMessage id="IDS_PASSWORD" />}
            variant="outlined"
            value={values.password}
            onChange={handleChange('password')}
            fullWidth
            inputProps={{
              autoComplete: 'new-password'
            }}
            endAdornment={
              <InputAdornment position="end">
                {values.password ? (
                  <IconButton
                    aria-label="toggle clear password"
                    onClick={handleClickClearPassword}
                  >
                    <CancelRoundedIcon style={{ fill: '#E0E0E0' }} />
                  </IconButton>
                ) : null}
                {values.password ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ) : null}
              </InputAdornment>
            }
            error={showError400}
          />
          {showError400 ? (
            <div className="text-error-login">
              <FormattedMessage id="IDS_INVALID_EMAIL_OR_PASSWORD" />
            </div>
          ) : null}
        </FormControl>
      </div>
      {/* button login */}
      <div className="button" onClick={handleLogin}>
        {loading ? (
          <CircularProgress style={{ color: '#fff' }} size={20} />
        ) : (
          <FormattedMessage id="IDS_SIGNIN" />
        )}
      </div>
      {/* forgot password */}
      <div
        className="text-forgot-password"
        onClick={redirectionPage}
        id={routes.FORGET_PASSWORD}
      >
        <FormattedMessage id="IDS_FORGOT_PASSWORD" />
      </div>
      {/* question have account */}
      <div className="inline">
        <div className="text">
          <FormattedMessage id="IDS_QUESTION_HAVE_ACCOUNT" />
        </div>
        <div
          className="text button-create-account"
          onClick={redirectionPage}
          id={routes.REGISTRATION}
        >
          <FormattedMessage id="IDS_CREATE_ACCOUNT" />
        </div>
      </div>
    </ContainerLogin>
  );
};

export default connect(state => ({}), { actionSnackBar })(withRouter(Login));