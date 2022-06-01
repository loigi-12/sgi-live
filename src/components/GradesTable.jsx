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
    {
      key: "edit",
      label: "Action",
      content: (grade) => (
        <button
          // onClick={() => this.props.onEdit(grade)}
          className="btn btn-info btn-sm"
        >
          Edit
        </button>
      ),
    },
  ];

  // editColumn = {
  //   key: "edit",
  //   content: (grade) => (
  //     <button
  //       onClick={() => this.props.onEdit(grade)}
  //       className="btn btn-info btn-sm"
  //     >
  //       Edit
  //     </button>
  //   ),
  // };

  // constructor() {
  //   super();
  //   const user = auth.getCurrentUser();
  //   if (user) this.columns.push(this.editColumn);
  // }

  render() {
    const { grades, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={grades} sortColumn={sortColumn} />
    );
  }
}

export default GradesTable;
