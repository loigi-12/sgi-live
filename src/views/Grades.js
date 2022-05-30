import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";

import SubjectsTable from "../components/SubjectsTable";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "id", order: "asc" },
  });
  const [unit, setUnit] = useState([]);
  const [sy, setSY] = useState([]);
  const [term, setTerm] = useState([]);

  let isTrue = false;
  let units = [];

  useEffect(() => {
    const getGrades = async () => {
      const data = await db.collection("grades").onSnapshot((snapshot) => {
        setGrades(snapshot.docs.map((doc) => doc.data()));
      });

      const values = [];

      grades.forEach((doc) => {
        values.push(doc.data());
      });

      const uniqueYear = values.map((subject) => subject.year);
      const uniqueTerm = values.map((subject) => subject.term);

      setSY([...new Set(uniqueYear)]);
      setTerm([...new Set(uniqueTerm)]);
    };

    getGrades();
  }, []);

  function setLooped() {
    isTrue = true;

    if (isTrue == true) {
      units = [];
    }

    isTrue = false;
  }

  function getTerm(term) {
    if (term === "1") {
      return "1st Semester";
    } else if (term === "2") {
      return "2nd Semester";
    } else {
      return "Summer";
    }
  }

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        {sy.map((sy) =>
          term.map((term) => (
            <Row>
              <Col md="12">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">
                      SY {sy}/{getTerm(term)}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <SubjectsTable
                      subjects={grades.filter(
                        (subject) =>
                          subject.year === sy && subject.term === term
                      )}
                      sortColumn={sortColumn}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <p className="card-category">
                      {grades.forEach((item, index) => {
                        if (item.year === sy && item.term === term) {
                          units.push(parseInt(item.noOfUnits));
                        }
                      })}
                      Average: {_.sum(units)}
                      {setLooped()}
                    </p>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ))
        )}
      </Container>
    </>
  );
}

export default Grades;
