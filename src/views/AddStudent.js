import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function AddForm() {
  const [course, setCourse] = useState();
  const [department, setDepartment] = useState();
  const [fullname, setName] = useState();
  const [studentId, setStudentId] = useState();
  const [year, setYear] = useState();
  const [block, setBlock] = useState();

  const [subjects, setSubjects] = useState([]);
  const [docId, setDocId] = useState();

  const handleSubmit = async () => {
    // await db
    //   .collection("students")
    //   .add({
    //     course: course,
    //     department: department,
    //     name: fullname,
    //     studentId: studentId,
    //     year: year,
    //     block: block,
    //   })
    //   .catch((error) => alert(error.message));

    await db
      .collection("students")
      .doc(docId)
      .collectionGroup("s_subjects")
      .add({
        code: course,
        desc: course,
        laboratoryHours: course,
        lectureHours: course,
        noOfUnits: course,
        preRequisite: course,
        term: course,
        year: course,
      })
      .catch((error) => alert(error.message));
  };

  const getSubjects = async () => {
    await db.collection("subjects").onSnapshot((snapshot) => {
      setSubjects(snapshot.docs.map((doc) => doc.data()));
    });

    await db
      .collection("students")
      .get()
      .then((snapshot) => {
        const sb = snapshot.docs.map((doc) => doc.data());
        sb.forEach((s) => {
          if (s.studentId == studentId) {
            setDocId(s.studentId);
          }
        });
      });
  };

  useEffect(() => {
    getSubjects();
  }, []);

  console.log(docId);

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Student</Card.Title>
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
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="8">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Fullname"
                          type="text"
                          value={fullname}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Department</label>
                        <Form.Control
                          placeholder="Department"
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Course</label>
                        <Form.Control
                          placeholder="Course"
                          type="text"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Block</label>
                        <Form.Control
                          placeholder="Block/Section"
                          type="text"
                          value={block}
                          onChange={(e) => setBlock(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Year</label>
                        <Form.Control
                          placeholder="Year Level"
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Load Subjects</label>
                        <Form.Control as="select">
                          <option selected disabled>
                            select subjects
                          </option>
                          {subjects.map((opt) => (
                            <option value={opt}>{opt.code}</option>
                          ))}
                        </Form.Control>
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
