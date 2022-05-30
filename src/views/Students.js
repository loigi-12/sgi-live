import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";

import StudentsTable from "../components/StudentsTable";

function Students() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [docId, setDocId] = useState();
  const [type, setType] = useState();
  const [teachers, setTeachers] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const [students, setStudents] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "studentId", order: "asc" },
  });

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

    await db.collection("students").onSnapshot((snapshot) => {
      setStudents(snapshot.docs.map((doc) => doc.data()));
      const student = snapshot.docs.map((doc) => doc.data());

      if (studentId.length > 0) {
        let ids = [];

        student.map((e) =>
          e.studentId.includes(studentId.map((e) => ids.push(e.studentId)))
        );

        const id = [...new Set(ids)];
        const filtered = student.filter((e) => e.studentId.includes(id));

        if (type === "teacher") {
          setStudents(filtered);
        }

        if (count == 5) setCount(0);
        else setCount(count + 1);

        console.log("1122");
      }
    });
  };

  useEffect(() => {
    getStudent();
  }, [count == 5 ? getStudent : count]);

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="12">
            <h6>Filter By</h6>
            <div>
              <span>Course</span>
              <span> Year</span>
              <span> Block</span>
            </div>
            <Card className="strpied-tabled-with-hover">
              <Card.Header></Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <StudentsTable students={students} sortColumn={sortColumn} />
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
