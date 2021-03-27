import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';

const styles = {
  root: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  card: {
    padding: 20,
    overflow: 'auto',
  },
  cardHeader: {
    textAlign: 'center',
  },
  btnDiv: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 21,
  },
};

const validateLogin = (values) => {
  const errors = {};

  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }
  return errors;
};

const LoginForm = (props) => {

  const { classes } = props;
  return (
      <Form
        validate = {validateLogin}
        onSubmit = {props.onSubmit}
      >
        {({ handleSubmit })=>(
          <div className={classes.root}>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} title="Login" />
                {props.errorMessage && (
                  <CustomizedSnackbar variant="error" className={classes.margin} message={props.errorMessage} />
                )}
              <CardContent>  
                <form method="post" onSubmit={handleSubmit}>
                  <Field type="text" name="username" component={renderText} label="Username" />
                  <br />
                  <Field type="password" name="password" component={renderText} label="Password" />
                  <br />
                  <div className={classes.btnDiv}>
                    <Button className={classes.btn} type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                    <p>
                      Don't have an account? <Link to={'/signup'}>Create one</Link>.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </Form>
    
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

// export default reduxForm({
//   form: 'LoginForm', // a unique identifier for this form
//   validate: validateLogin, // ←Callback function for client-side validation
// })(withStyles(styles)(LoginForm));

export default (withStyles(styles)(LoginForm));
