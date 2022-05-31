import React, { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";

function AddForm() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [value, setValue] = useState([]);

  const getStudents = async () => {
    await db.collection("students").onSnapshot((snapshot) => {
      setStudents(snapshot.docs.map((doc) => doc.data()));
    });
  };

  const getSubjects = async () => {
    await db.collection("subjects").onSnapshot((snapshot) => {
      setSubjects(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getStudents();
    getSubjects();
  }, []);

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Teacher</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>ID Number</label>
                        <Form.Control
                          placeholder="ID Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="5">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Fullname"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Add Student</label>
                        <Form.Control
                          as="select"
                          // value={value}
                          // onChange={(e) => {
                          //   setType(e.target.value);
                          // }}
                        >
                          <option selected disabled>
                            Select option
                          </option>
                          {students.map((opt) => (
                            <option value={opt}>
                              {opt.studentId} - {opt.name}, {opt.course}{" "}
                              {opt.year}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Load Subjects</label>
                        <Form.Control
                          as="select"
                          // value={type}
                          // onChange={(e) => {
                          //   setType(e.target.value);
                          // }}
                        >
                          {/* <option selected disabled>
                            Select option
                          </option>
                          {subjects.map((opt) => (
                            <option value={opt.code}>
                              {opt.code} - {opt.description}
                            </option>
                          ))} */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Submit
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddForm;
