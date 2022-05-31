import React, { useState } from "react";
import { db, firebase } from "../firebase";

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function AddForm() {
  const [code, setCode] = useState();
  const [desc, setDesc] = useState();
  const [lab, setLab] = useState();
  const [lect, setLect] = useState();
  const [unit, setUnit] = useState();
  const [pre, setPre] = useState();
  const [term, setTerm] = useState();
  const [year, setYear] = useState();

  const handleSubmit = async () => {
    await db
      .collection("subjects")
      .add({
        code: code,
        description: desc,
        laboratoryHours: lab,
        lectureHours: lect,
        noOfUnits: unit,
        preRequisite: pre,
        term: term,
        year: year,
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Container fluid style={{ marginTop: 20 }}>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Subject</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Code</label>
                        <Form.Control
                          placeholder="Code"
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="8">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Unit</label>
                        <Form.Control
                          placeholder="No. of Units"
                          type="number"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Lecture</label>
                        <Form.Control
                          placeholder="No. of lecture hours"
                          type="number"
                          value={lect}
                          onChange={(e) => setLect(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Laboratory</label>
                        <Form.Control
                          placeholder="No. of laboratory hours"
                          type="number"
                          value={lab}
                          onChange={(e) => setLab(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Term</label>
                        <Form.Control
                          placeholder="Semester"
                          type="number"
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>SY</label>
                        <Form.Control
                          placeholder="School Year"
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Pre-Requisite</label>
                        <Form.Control
                          placeholder="Pre-Requisite"
                          type="text"
                          value={pre}
                          onChange={(e) => setPre(e.target.value)}
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
