import React, { useState, useEffect } from "react";
import {
  Container,
  ProgressBar,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import lessons from "../data/lessons";

const SQLCourse = () => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("sqlProgress")) || [];
    setCompletedLessons(savedProgress);
  }, []);

  const toggleCompletion = (id) => {
    let updatedProgress = completedLessons.includes(id)
      ? completedLessons.filter((lessonId) => lessonId !== id)
      : [...completedLessons, id];

    setCompletedLessons(updatedProgress);
    localStorage.setItem("sqlProgress", JSON.stringify(updatedProgress));
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    localStorage.removeItem("sqlProgress");
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <Container className="my-5">
      <h2>Khóa học SQL</h2>
      <ProgressBar
        now={progressPercentage}
        label={`${Math.round(progressPercentage)}%`}
        className="mb-3"
      />
      <Button variant="danger" onClick={resetProgress} className="mb-3">
        Học lại từ đầu
      </Button>
      <ListGroup>
        {lessons.map((lesson) => (
          <ListGroup.Item
            key={lesson.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span
              onClick={() => setSelectedLesson(lesson)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {lesson.title}
            </span>
            <Button
              variant={
                completedLessons.includes(lesson.id)
                  ? "success"
                  : "outline-secondary"
              }
              onClick={() => toggleCompletion(lesson.id)}
            >
              {completedLessons.includes(lesson.id)
                ? "✔ Hoàn thành"
                : "Chưa hoàn thành"}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedLesson && (
        <Modal show={!!selectedLesson} onHide={() => setSelectedLesson(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedLesson.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedLesson.content}</p>
            {selectedLesson.example && (
              <pre
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {selectedLesson.example}
              </pre>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={
                completedLessons.includes(selectedLesson.id)
                  ? "success"
                  : "outline-secondary"
              }
              onClick={() => toggleCompletion(selectedLesson.id)}
            >
              {completedLessons.includes(selectedLesson.id)
                ? "✔ Hoàn thành"
                : "Đánh dấu hoàn thành"}
            </Button>
            <Button variant="secondary" onClick={() => setSelectedLesson(null)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default SQLCourse;
