import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import Modal from "./Modal";

class StudentsTable extends Component {
  columns = [
    { path: "studentId", label: "Student ID" },
    {
      path: "name",
      label: "Name",
      content: (student) => (
        <Link to={`/student/${student.studentId}`}>{student.name}</Link>
      ),
    },
    { path: "department", label: "Department" },
    { path: "course", label: "Course" },
    { path: "year", label: "Year Level" },
    { path: "block", label: "Block" },
  ];

  render() {
    const { students, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={students} sortColumn={sortColumn} />
    );
  }
}

export default StudentsTable;
