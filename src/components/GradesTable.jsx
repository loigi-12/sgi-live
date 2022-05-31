import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";

class GradesTable extends Component {
  columns = [
    { path: "code", label: "Code" },
    {
      path: "description",
      label: "Description",
    },
    { path: "grade", label: "Grade" },
    { path: "remarks", label: "Remarks" },
  ];

  render() {
    const { grades, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={grades} sortColumn={sortColumn} />
    );
  }
}

export default GradesTable;
