// // src/components/courses/CoursesAllGrid.jsx
// import React from "react";
// import CourseCardSimple from "./CourseCardSimple";

// export const CoursesAllGrid = ({ courses, loading, error }) => {
//   if (loading) return <p>Loading courses...</p>;
//   if (error) return <p className='text-danger'>{error}</p>;
//   if (!courses || courses.length === 0) return <p>No courses found.</p>;

//   return (
//     <div className='container'>
//       <div className='row g-4'>
//         {courses.map((course) => (
//           <CourseCardSimple key={course._id} course={course} />
//         ))}
//       </div>
//     </div>
//   );
// };

// src/components/courses/CoursesAllGrid.jsx
import React from "react";
import CourseCardSimple from "./CourseCardSimple";

export const CoursesAllGrid = ({ courses, loading, error }) => {
  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (!courses || courses.length === 0) return <p>No courses found.</p>;

  // ✅ 1️⃣ Group courses by Judiciary name
  const groupedCourses = courses.reduce((groups, course) => {
    const key = course?.subsubCategory?.name || "Unknown Judiciary";
    if (!groups[key]) groups[key] = [];
    groups[key].push(course);
    return groups;
  }, {});

  return (
    <div className='container'>
      {Object.entries(groupedCourses).map(([judiciaryName, grouped]) => (
        <div key={judiciaryName} className='mb-5'>
          <div
            className={`row g-4 ${
              grouped.length === 1 ? "justify-content-center" : ""
            }`}
          >
            {grouped.map((course) => (
              <div key={course._id} className='col-lg-4 col-md-6 col-sm-12'>
                <CourseCardSimple course={course} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
