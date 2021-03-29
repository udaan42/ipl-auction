import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';

import Select from 'react-select';

const options = [
  { value: 'moderator', label: 'Moderator' },
  { value: 'player', label: 'Player' }
];

const teamOptions = [
  { value: 'CSK', label: 'CSK' },
  { value: 'MI', label: 'MI' },
  { value: 'RCB', label: 'RCB' },
  { value: 'RR', label: 'RR' },
  { value: 'KKR', label: 'KKR' },
  { value: 'KP', label: 'KP' },
  { value: 'SRH', label: 'SRH' },
  { value: 'DC', label: 'DC' }
];

const styles = {
  root: {
    minWidth: 320,
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
  label:{
    marginBottom:25,
    fontWeight: 500
  },
  dropdownSelect: {
    width: 250,
    marginBottom: 40
  }
};


  
const CreateLeagueForm = (props) => {

    const [selectedOption, setRole] = useState({});
    const [selectedTeam, setTeam] = useState({});
    const [leagueName, setLeagueName] = useState();
    const [teamName, setTeamName] = useState();

    const validateForm = (values) => {
      const errors = {};
      console.log(values);
    
      const requiredFields = ['name', 'teamName'];
      requiredFields.forEach((field) => {
        if (!values[field]) {
          errors[field] = '(The ' + field + ' field is required.)';
        }
      });

      setLeagueName(values.name);
      if(values.teamName){
        setTeamName(values.teamName);
      }
      
  
      return errors;
  };

    const handleChange = selectedOption => {
      setRole(selectedOption);
    };

    const handleTeamChange = selectedTeam => {
      setTeam(selectedTeam);
    };
    
    const { classes } = props;

    const joinLeague = () => {
        props.joinAnotherLeague();
    }

    const handleClick = () => {
      if(props.form > 1) {
        props.buttonClick(leagueName, selectedOption, selectedTeam, teamName);
      }else{
        props.onSubmit();
      }
    }

    const title = leagueName || "Create a League"
    

    return (
        <Form
          validate = {validateForm}
          onSubmit = {props.onSubmit}
        >
          {({ handleSubmit })=>(
            <div className={classes.root}>
              <Card className={classes.card}>
                <CardHeader className={classes.cardHeader} title={title} />
                  {props.errorMessage && (
                    <CustomizedSnackbar variant="error" className={classes.margin} message={props.errorMessage} />
                  )}
                <CardContent>  
                  <form method="post" onSubmit={handleSubmit}>
                    { (props.form == 1) ? <Field type="text" name="name" component={renderText} label="League Name" />: ""}
                    <br />
                    { (props.form == 2) ? <><Typography className={classes.label} variant="subtitle1"> Please select your role. A League needs atleast 1 moderator to start the auction</Typography> <Select
                      value={selectedOption}
                      className={classes.dropdownSelect}
                      onChange={handleChange}
                      options={options}
                    /> </>: ""}
                    { (props.form == 3) ? <><Typography className={classes.label} variant="subtitle1"> Please select your team name. </Typography>
                    <Field type="text" name="teamName" component={renderText} label="Team Name" />
                    <Select
                      className={classes.dropdownSelect}
                      value={selectedTeam}
                      onChange={handleTeamChange}
                      options={teamOptions}
                    /> </>: "" }
                    <div className={classes.btnDiv}>
                      { (props.form == 1) ? (<><Button className={classes.btn} onClick={handleClick} type="submit" variant="contained" color="primary">
                        Create
                      </Button>
                      <p className={classes.footer}>
                        Have a league code already? <Link onClick={joinLeague}>Join a league</Link>.
                      </p></>) : <Button className={classes.btn} onClick={handleClick} type="submit" variant="contained" color="primary">
                        Submit
                      </Button>}
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
  