import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db, firebase } from "../firebase";

import StudentsTable from "../components/StudentsTable";
import GradesTable from "components/GradesTable";

function Students(props) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [docId, setDocId] = useState();
  const [type, setType] = useState();
  const [teachers, setTeachers] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "studentId", order: "asc" },
  });

  const { id } = props.match.params;
  console.log(id);

  const getStudent = async () => {
    await db.collection("users").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      data.map((u) => {
        if (u.email === firebase.auth().currentUser.email) {
          setDocId(u.docId);
          setType(u.accountType);
        }
      });
    });

    await db
      .collection("teachers")
      .doc(docId)
      .collection("t_students")
      .onSnapshot((snapshot) =>
        setStudentId(snapshot.docs.map((doc) => doc.data()))
      );

    await db
      .collectionGroup("s_subjects")
      .onSnapshot((snapshot) =>
        setGrades(snapshot.docs.map((doc) => doc.data()))
      );

    await db.collection("students").onSnapshot((snapshot) => {
      const student = snapshot.docs.map((doc) => doc.data());

      let ids = [];

      student.map((e) =>
        e.studentId.includes(studentId.map((e) => ids.push(e.studentId)))
      );

      const id = [...new Set(ids)];
      const filtered = student.filter((e) => e.studentId.includes(id));

      if (type == "teacher") {
        setStudents(filtered);
      } else {
        setStudents(snapshot.docs.map((doc) => doc.data()));
      }
    });
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="7">
            {/* <h6>Filter By</h6>
            <div>
              <span>Course</span>
              <span> Year</span>
              <span> Block</span>
            </div> */}
            <Card className="strpied-tabled-with-hover">
              <Card.Header>Student Lists</Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <StudentsTable students={students} sortColumn={sortColumn} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col md="5">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>Grade Details {id}</Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <GradesTable grades={grades} sortColumn={sortColumn} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Students;
