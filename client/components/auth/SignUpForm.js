import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';

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

const validateSignUp = (values) => {
  const errors = {};

  const requiredFields = ['first_name', 'last_name', 'username', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = '(Invalid email address.)';
  // }
  return errors;
};

const SignUpForm = (props) => {
  const { onSubmit, classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Sign Up" />
        <CardContent>

          <Form
            validate = {validateSignUp}
            onSubmit = {props.onSubmit}
          >
            {({ handleSubmit })=>(
              <form method="post" onSubmit={handleSubmit}>
                <Field type="text" name="first_name" component={renderText} label="First Name" />
                <br />
                <Field type="text" name="last_name" component={renderText} label="Last Name" />
                <br />
                <Field type="text" name="username" component={renderText} label="UserName" />
                <br />
                <Field type="password" name="password" component={renderText} label="Password" />
                <br />
                <div className={classes.btnDiv}>
                  <Button className={classes.btn} type="submit" variant="contained" color="primary">
                    Create New Account
                  </Button>
                  <p>
                    Already have an account? <Link to={'/'}>Login</Link>.
                  </p>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};



SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(SignUpForm));
