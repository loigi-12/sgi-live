import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

import GradesTable from "../components/GradesTable";

function Grades() {
  const [docId, setDocId] = useState();
  const [type, setType] = useState();
  const [subjects, setSubjects] = useState([]);
  const [subjectsCode, setSubjectsCode] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    sortColumn: { path: "id", order: "asc" },
  });
  const [sy, setSY] = useState([]);
  const [term, setTerm] = useState([]);

  const ref = useRef();

  async function getSubject() {
    try {
      await db.collection("users").onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());

        data.map((u) => {
          if (u.email === firebase.auth().currentUser.email) {
            setDocId(u.docId);
            setType(u.accountType);
          }
        });
      });

      await db.collectionGroup("s_subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));

        const uniqueYear = snapshot.docs.map((doc) => doc.data().year);
        const uniqueTerm = snapshot.docs.map((doc) => doc.data().term);

        setSY([...new Set(uniqueYear)]);
        setTerm([...new Set(uniqueTerm)]);
      });
    } catch (error) {}
  }

  const ComponentToPrint = forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <Container fluid style={{ marginTop: 20 }}>
          <h2>Grade Reports</h2>
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
                      <GradesTable
                        grades={subjects.filter(
                          (subject) =>
                            subject.year == sy && subject.term == term
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
      </div>
    );
  });

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
      <ComponentToPrint ref={ref} />

      <ReactToPrint content={() => ref.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <Button
              className="btn-fill pull-right"
              style={{ marginLeft: 15, marginTop: -10 }}
              onClick={handlePrint}
            >
              Download
            </Button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
    </>
  );
}

export default Grades;
