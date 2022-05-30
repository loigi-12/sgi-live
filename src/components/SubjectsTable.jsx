import React from "react";
import Table from "./common/Table";

class SubjectsTable extends React.Component {
  columns = [
    { path: "code", label: "Code" },
    { path: "description", label: "Description" },
    { path: "lectureHours", label: "Lecture" },
    { path: "laboratoryHours", label: "Laboratory" },
    { path: "noOfUnits", label: "Unit" },
    { path: "preRequisite", label: "Prerequisite" },
  ];

  render() {
    const { subjects, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={subjects} sortColumn={sortColumn} />
    );
  }
}

export default SubjectsTable;
