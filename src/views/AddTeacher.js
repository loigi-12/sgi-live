import React, { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { db, firebase } from "../firebase";

function AddForm() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [value, setValue] = useState([]);

  const [name, setName] = useState();
  const [teacherId, setTeacher] = useState();

  const handleSubmit = async () => {
    try {
      await db
        .collection("teachers")
        .add({
          name: name,
          teacherId: teacherId,
        })
        .then((docRef) => {
          // setDocId(docRef.id);
          alert("Teacher Added Successfully!");
        })
        .catch((error) => alert(error));
    } catch (error) {}
  };

  const getStudents = async () => {
    try {
      await db.collection("students").onSnapshot((snapshot) => {
        setStudents(snapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {}
  };

  const getSubjects = async () => {
    try {
      await db.collection("subjects").onSnapshot((snapshot) => {
        setSubjects(snapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {}
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
                          value={teacherId}
                          onChange={(e) => setTeacher(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="5">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Fullname"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={handleSubmit}
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
