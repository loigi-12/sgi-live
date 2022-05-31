import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db, firebase } from "../firebase";

export default function Signup() {
  const emailRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState([]);
  const [teacherId, setTeacherId] = useState([]);
  const [docId, setDocId] = useState();
  const [usersId, setUsersId] = useState([]);
  const [usersEmail, setUsersEmail] = useState([]);
  const [type, setType] = useState();

  async function checkStudentNumber() {
    const std = await db.collection("students").onSnapshot((snapshot) => {
      setStudentId(snapshot.docs.map((doc) => doc.data().studentId));
    });

    const tchr = await db.collection("teachers").onSnapshot((snapshot) => {
      setTeacherId(snapshot.docs.map((doc) => doc.data().teacherId));
    });

    const usr = await db.collection("users").onSnapshot((snapshot) => {
      setUsersId(snapshot.docs.map((doc) => doc.data().studentId));
      setUsersEmail(snapshot.docs.map((doc) => doc.data().email));
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (type == undefined) return setError("Choose account type.");

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match");

    if (type === "student")
      if (studentId.includes(idRef.current.value) == false)
        return setError("Student's Id does not exist.");

    if (type === "teacher")
      if (teacherId.includes(idRef.current.value) == false)
        return setError("Teacher's Id does not exist.");

    const getDocId = await db
      .collection(type === "teacher" ? "teachers" : "students")
      .get()
      .then((snapshot) =>
        type === "teacher"
          ? snapshot.docs.forEach((doc) => {
              if (doc.data().teacherId == idRef.current.value) {
                console.log("teacher");
                setDocId(doc.id);
              }
            })
          : snapshot.docs.forEach((doc) => {
              if (doc.data().studentId == idRef.current.value) {
                console.log("student");
                setDocId(doc.id);
              }
            })
      );

    try {
      setError("");
      setLoading(true);

      if (
        usersId.includes(idRef.current.value) == false &&
        usersEmail.includes(emailRef.current.value) == false
      ) {
        await db
          .collection("users")
          .add({
            accountType: type,
            email: emailRef.current.value,
            idNumber: idRef.current.value,
            docId: docId,
          })
          .catch((error) => alert(error.message));

        await signup(emailRef.current.value, passwordRef.current.value);
      } else {
        setLoading(false);
        return setError(
          "The Id number or email address is associated with another user."
        );
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkStudentNumber();
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="formBasicSelect">
              <Form.Label>Select Account</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="" selected disabled>
                  Choose your account
                </option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Control>
            </Form.Group>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="id">
                <Form.Label>ID Number</Form.Label>
                <Form.Control
                  type="number"
                  ref={idRef}
                  required
                  onChange={() => setError("")}
                />
              </Form.Group>
              <hr />
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  onChange={() => setError("")}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirmation Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="login">Login</Link>
        </div>
      </div>
    </Container>
  );
}
