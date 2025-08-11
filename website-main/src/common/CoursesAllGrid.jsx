// import React from "react";
// import CourseCardSimple from "./CourseCardSimple";

// export const CoursesAllGrid = ({ courses, loading, error }) => {
//   if (loading) return <p>Loading courses...</p>;
//   if (error) return <p className='text-danger'>{error}</p>;
//   if (!courses || courses.length === 0) return <p>No courses found.</p>;

//   // ✅ 1️⃣ Group courses by Judiciary name
//   const groupedCourses = courses.reduce((groups, course) => {
//     const key = course?.subsubCategory?.name || "Unknown Judiciary";
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(course);
//     return groups;
//   }, {});

//   return (
//     <div className='container'>
//       {Object.entries(groupedCourses).map(([judiciaryName, grouped]) => (
//         <div key={judiciaryName} className='mb-5'>
//           <div className={`row g-4 ${grouped.length === 1 ? "" : ""}`}>
//             <h4>{judiciaryName}</h4>
//             {grouped.map((course) => (
//               <div key={course._id} className='col-lg-4 col-md-6 col-sm-12'>
//                 <CourseCardSimple
//                   course={course}
//                   currentFilter={{ judiciaryName }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// import React from "react";
// import CourseCardSimple from "./CourseCardSimple";

// export const CoursesAllGrid = ({ courses, loading, error }) => {
//   if (loading) return <p>Loading courses...</p>;
//   if (error) return <p className="text-danger">{error}</p>;
//   if (!courses || courses.length === 0) return <p>No courses found.</p>;

//   return (
//     <div className="container">
//       <div className="row g-4">
//         {courses.map((course) => (
//           <div key={course._id} className="col-lg-4 col-md-6 col-sm-12 d-flex">
//             <CourseCardSimple
//               course={course}
//               currentFilter={{
//                 judiciaryName: course?.subsubCategory?.name || "Unknown Judiciary",
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// import React from "react";
// import CourseCardSimple from "./CourseCardSimple";

// export const CoursesAllGrid = ({ courses, loading, error }) => {
//   if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
//   if (error) return <p className='alert alert-danger text-center'>{error}</p>;
//   if (!courses || courses.length === 0) return <p className='alert alert-info text-center'>No courses found.</p>;

//   return (
//     <div className='container'>

//       <div className='row g-4'>

//         {courses.map((course) => (
//           <div key={course._id} className='col-lg-4 col-md-6 col-sm-12'>
//             <CourseCardSimple
//               course={course}
//               // Still pass judiciary info for filtering if needed
//               currentFilter={{
//                 judiciaryName: course?.subsubCategory?.name || "Other"
//               }}
//             />

//       {Object.entries(groupedCourses).map(([judiciaryName, grouped]) => (
//         <div key={judiciaryName} className='mb-5'>
//           <div className={`row g-4 ${grouped.length === 1 ? "" : ""}`}>
//             {/* <h4>{judiciaryName}</h4> */}
//             {grouped.map((course) => (
//               <div key={course._id} className='col-lg-4 col-md-6 col-sm-12'>
//                 <CourseCardSimple
//                   course={course}
//                   currentFilter={{ judiciaryName }}
//                 />
//               </div>
//             ))}

//           </div>
//         ))}

//         {/* Add empty placeholders to maintain layout if needed */}
//         {courses.length % 3 !== 0 &&
//           Array.from({ length: 3 - (courses.length % 3) }).map((_, index) => (
//             <div key={`placeholder-${index}`} className='col-lg-4 col-md-6 col-sm-12' />
//           ))
//         }
//       </div>
//     </div>
//     <div>
//   );
// };
import React from "react";
import CourseCardSimple from "./CourseCardSimple";

export const CoursesAllGrid = ({ courses, groupedCourses, loading, error }) => {
  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error) return <p className="alert alert-danger text-center">{error}</p>;

  if (!courses || courses.length === 0)
    return <p className="alert alert-info text-center">No courses found.</p>;

  return (
    <div className="container">
      {/* Normal Courses */}
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course._id} className="col-lg-4 col-md-6 col-sm-12">
            <CourseCardSimple
              course={course}
              currentFilter={{
                judiciaryName: course?.subsubCategory?.name || "Other",
              }}
            />
          </div>
        ))}

        {/* Empty placeholders to maintain layout */}
        {courses.length % 3 !== 0 &&
          Array.from({ length: 3 - (courses.length % 3) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="col-lg-4 col-md-6 col-sm-12"
            />
          ))}
      </div>

      {/* Grouped Courses */}
      {groupedCourses &&
        Object.entries(groupedCourses).map(([judiciaryName, grouped]) => (
          <div key={judiciaryName} className="mb-5">
            <div className={`row g-4 ${grouped.length === 1 ? "" : ""}`}>
              {grouped.map((course) => (
                <div
                  key={course._id}
                  className="col-lg-4 col-md-6 col-sm-12"
                >
                  <CourseCardSimple
                    course={course}
                    currentFilter={{ judiciaryName }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
