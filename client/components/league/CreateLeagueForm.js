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
    marginTop: '50px', 
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
  footer: {
    marginTop: 15
  },
};

const validateForm = (values) => {
    const errors = {};
    console.log(values);
  
    const requiredFields = ['name'];
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
  
  const CreateLeagueForm = (props) => {
    
    const { classes } = props;

    const joinLeague = () => {
        props.joinAnotherLeague();
    }

    return (
        <Form
          validate = {validateForm}
          onSubmit = {props.onSubmit}
        >
          {({ handleSubmit })=>(
            <div className={classes.root}>
              <Card className={classes.card}>
                <CardHeader className={classes.cardHeader} title="Create a League" />
                  {props.errorMessage && (
                    <CustomizedSnackbar variant="error" className={classes.margin} message={props.errorMessage} />
                  )}
                <CardContent>  
                  <form method="post" onSubmit={handleSubmit}>
                    <Field type="text" name="name" component={renderText} label="League Name" />
                    <br />
                    <div className={classes.btnDiv}>
                      <Button className={classes.btn} type="submit" variant="contained" color="primary">
                        Create League
                      </Button>
                      <p className={classes.footer}>
                        Have a league code already? <Link onClick={joinLeague}>Join a league</Link>.
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
  
  CreateLeagueForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  export default (withStyles(styles)(CreateLeagueForm));
  