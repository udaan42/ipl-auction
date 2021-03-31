import React from "react";
import {
  Button,
  Segment,
  Divider,
  Tab,
  Table,
  Message,
  Checkbox,
  Form,
  Icon,
  Input,
  Dropdown,
  Dimmer,
  Loader,
  Label,
  Container,
  Header
} from "semantic-ui-react";

import axios from "axios";
import TableSlider from "./TableSlider";

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

//schedules
mock.onGet("/dataschemas/2/queryschemas/1/queries/1/schedules").reply(200, {
  data: [
    {
      id: "703",
      selfUri: "/queries/1/schedules/1",
      type: "Schedule",
      startTime: 1552421951369,
      status: "Complete"
    },
    {
      id: "1403",
      selfUri: "/queries/1/schedules/2",
      type: "Schedule",
      startTime: 1552488791150,
      status: "Pending"
    }
  ]
});

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataschemas: [],
      dataSchemaName: "",
      queryschemas: [],
      querySchemaName: "",
      queries: [],
      queryName: "",
      queriesUri: "",
      schedules: [],
      scheduleIdsToExport: []
    };
  }

  fileInputRef = React.createRef();

  async componentDidMount() {
    //get data for export schedules dropdown

    await this.getSchedules();
  }

  getSchedules = async () => {
    //get schedules for selected query
    try {
      const { data } = await axios.get(
        "/dataschemas/2/queryschemas/1/queries/1/schedules"
      );
      const schedules = data.data;
      this.setState({ schedules: schedules });
      console.log("Schedules ---> ", schedules);
    } catch (error) {
      console.error(Error(`Error getting schedules ${error.message}`));
    }
  };

  slider = ({ id, isExported }) => {
    if (isExported === true) {
      this.setState(
        {
          scheduleIdsToExport: [id, ...this.state.scheduleIdsToExport]
        },
        () => console.log(this.state.scheduleIdsToExport)
      );
    } else {
      const newArray = this.state.scheduleIdsToExport.filter(
        storedId => storedId !== id
      );
      this.setState(
        {
          scheduleIdsToExport: newArray
        },
        () => console.log(this.state.scheduleIdsToExport)
      );
    }
  };

  render() {
    const {
      dataschemas,
      dataSchemaName,
      queryschemas,
      querySchemaName,
      queries,
      queryName,
      schedules
    } = this.state;
    const panes = [
      {
        menuItem: "Export Schedule(s)",
        render: () => (
          <>
            <Divider style={{ padding: "2em" }} horizontal>
              Schedule(s) table
            </Divider>
            <Message>Info about what exporting these schedues will do</Message>
            <Segment>
              <Dimmer active={schedules && schedules.length < 1}>
                <Loader inverted />
              </Dimmer>
              {schedules && (
                <Table celled compact definition>
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>Schduled For</Table.HeaderCell>
                      <Table.HeaderCell>Self Uri</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {Object.values(schedules).map(
                      ({ id, startTime, selfUri, status }) => {
                        return (
                          <TableSlider
                            id={id}
                            startTime={startTime}
                            selfUri={selfUri}
                            status={status}
                            slide={this.slider.bind(this)}
                          />
                        );
                      }
                    )}
                  </Table.Body>

                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan="4">
                        <Button size="small">Export </Button>
                        <Button disabled size="small">
                          Export All
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              )}
            </Segment>
            <Divider style={{ padding: "2em" }} horizontal>
              EXPORT SCHEDULE(S) TABLE
            </Divider>
            <Segment>
              <Message>
                This is the table where the the checked schedules from above get
                moved to, so they can be exported.
              </Message>
              <Table celled compact definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Schduled For</Table.HeaderCell>
                    <Table.HeaderCell>Self Uri</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body />
              </Table>
            </Segment>
          </>
        )
      }
    ];
    return (
      <Segment style={{ padding: "5em 1em" }} vertical>
        <Divider horizontal>OFFLINE USAGE</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}

export default Temp;
