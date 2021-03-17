import React from 'react';
import { Button, Container, Image, Row, Col, Table} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

const styles = {
    teamSummary:{
        marginTop: 15
    },
    tab:{
        backgroundColor: "#eee",
        textAlign: "center",
        padding: 10,
        fontSize: 13,
        border: "solid 1px #dedede",
        borderRadius: 3,
        marginRight: 15
    }
}

const TeamSummary = (props) => {
    return(
        <Container className={props.classes.teamSummary} fluid>
            <Row md={7} lg={7} sm={7}>
                <Col className={props.classes.tab}>
                    1
                    <Typography variant="body2"> Slots left- 4/15</Typography>
                    <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>
                    2
                    <Typography variant="body2"> Slot left - 4/15</Typography>
                    <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>3
                <Typography variant="body2"> Slot left - 4/15</Typography>
                <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>4
                <Typography variant="body2"> Slot left - 4/15</Typography>
                <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>5
                <Typography variant="body2"> Slot left - 4/15</Typography>
                <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>6
                <Typography variant="body2"> Slot left - 4/15</Typography>
                <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
                <Col className={props.classes.tab}>7
                <Typography variant="body2"> Slot left - 4/15</Typography>
                <Typography variant="body2"> Purse balance - 80 crores</Typography>
                </Col>
            </Row>
        </Container>
    )
}

export default (withStyles(styles)(TeamSummary));