import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db, firebase } from "../firebase";

import CoursesTable from "../components/CoursesTable";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "course", order: "asc" },
  });

  useEffect(() => {
    const getCourse = async () => {
      const data = await db.collection("courses").onSnapshot((snapshot) => {
        setCourses(snapshot.docs.map((doc) => doc.data()));
      });
    };

    getCourse();
  }, []);

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header></Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <CoursesTable
                  courses={courses}
                  sortColumn={sortColumn}
                  onDelete={() => console.log("clicked")}
                />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Courses;
