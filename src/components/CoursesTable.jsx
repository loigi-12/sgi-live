import React, { Component } from "react";
import Table from "./common/Table";

class CoursesTable extends Component {
  columns = [
    { path: "course", label: "Course" },
    { path: "description", label: "Description" },
    { path: "department", label: "Department" },
    // {
    //   key: "edit",
    //   content: (course) => (
    //     <button
    //       onClick={() => this.props.onDelete(course)}
    //       className="btn btn-success btn-sm"
    //     >
    //       Edit
    //     </button>
    //   ),
    // },
    // {
    //   key: "delete",
    //   content: (course) => (
    //     <button
    //       onClick={() => this.props.onDelete(course)}
    //       className="btn btn-danger btn-sm"
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ];

  render() {
    const { courses, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={courses} sortColumn={sortColumn} />
    );
  }
}

export default CoursesTable;
