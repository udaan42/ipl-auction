import React, { Component } from "react";
import { Table, Checkbox } from "semantic-ui-react";

export default class TableSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exportSlider: false
    };
  }
  slider = () => {
    this.setState({ exportSlider: !this.state.exportSlider }, () => {
      console.log("slider --> ", this.state.exportSlider);
      const { id, slide } = this.props;
      slide({ id, isExported: this.state.exportSlider });
    });
  };

  render() {
    const { id, startTime, selfUri, status } = this.props;
    return (
      <React.Fragment>
        <Table.Row>
          <Checkbox slider onChange={this.slider} />
          <Table.Cell>{id}</Table.Cell>
          <Table.Cell>Value</Table.Cell>
          <Table.Cell>{selfUri}</Table.Cell>
          <Table.Cell>{status}</Table.Cell>
        </Table.Row>
      </React.Fragment>
    );
  }
}
