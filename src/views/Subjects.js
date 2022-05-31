import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";

import SubjectsTable from "../components/SubjectsTable";

function Subjects() {
  const [docId, setDocId] = useState();
  const [type, setType] = useState("student");
  const [subjects, setSubjects] = useState([]);
  const [subjectsCode, setSubjectsCode] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "id", order: "asc" },
  });
  const [sy, setSY] = useState([]);
  const [term, setTerm] = useState([]);

  async function getSubject() {
    await db.collection("users").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      data.map((u) => {
        if (u.email === firebase.auth().currentUser.email) {
          setDocId(u.docId);
          setType(u.accountType);
        }
      });
    });

    if (type == "student") {
      await db.collectionGroup("s_subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));

        const uniqueYear = snapshot.docs.map((doc) => doc.data().year);
        const uniqueTerm = snapshot.docs.map((doc) => doc.data().term);

        setSY([...new Set(uniqueYear)]);
        setTerm([...new Set(uniqueTerm)]);
      });
    } else {
      await db.collection("subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));

        const uniqueYear = snapshot.docs.map((doc) => doc.data().year);
        const uniqueTerm = snapshot.docs.map((doc) => doc.data().term);

        setSY([...new Set(uniqueYear)]);
        setTerm([...new Set(uniqueTerm)]);
      });
    }
  }

  useEffect(() => {
    getSubject();
  }, []);

  function getTerm(term) {
    if (term == "1") {
      return "1st Semester";
    } else if (term == "2") {
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
                    {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <SubjectsTable
                      subjects={subjects.filter(
                        (subject) => subject.year == sy && subject.term == term
                      )}
                      sortColumn={sortColumn}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <p className="card-category"></p>
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

export default Subjects;
