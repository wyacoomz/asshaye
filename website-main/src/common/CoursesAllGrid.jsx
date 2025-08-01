// src/components/courses/CoursesAllGrid.jsx
import React from "react";
import CourseCardSimple from "./CourseCardSimple";

export const CoursesAllGrid = ({ courses, loading, error }) => {
  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (!courses || courses.length === 0) return <p>No courses found.</p>;

  return (
    <div className='container'>
      <div className='row g-4'>
        {courses.map((course) => (
          <CourseCardSimple key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};
