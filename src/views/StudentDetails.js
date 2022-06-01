import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { db, firebase } from "../firebase";
import GradesTable from "../components/GradesTable";

function StudentDetails() {
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

  const { id } = useParams();

  const handleEdit = (id) => {
    alert("edit", id);
  };

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

      console.log(docId);

      // const ss = await db
      //   .collection("students")
      //   .doc(docId)
      //   .collection("s_subjects")
      //   .get();

      // ss.docs.map((doc) => console.log(doc.data()));

      await db.collectionGroup("s_subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));

        const uniqueYear = snapshot.docs.map((doc) => doc.data().year);
        const uniqueTerm = snapshot.docs.map((doc) => doc.data().term);

        setSY([...new Set(uniqueYear)]);
        setTerm([...new Set(uniqueTerm)]);
      });
    } catch (error) {}
  }

  function getTerm(term) {
    if (term == "1") {
      return "1st Semester";
    } else if (term == "2") {
      return "2nd Semester";
    } else {
      return "Summer";
    }
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
                        // onEdit={handleEdit}
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

export default StudentDetails;
