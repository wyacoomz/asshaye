

import React from "react";
import { Link } from "react-router-dom";
import { CoursesSidebar } from "./CoursesSidebar";

export const CoursesAllContainerSidebar = ({ isGrid, children, onCategorySelect }) => {
  // Handler to pass the selected category to parent component
  const handleCategorySelect = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category); // Pass the entire category object
    }
  };

  return (
    <section id="margin-top">
      <div className="td_height_10 td_height_lg_10" />
      <div className="container">
        <h3 className="text-center  fw-bold mb-4 d-none d-sm-block">
  <span style={{ borderBottom: "3px solid red", paddingBottom: "5px" }}>
    Explore Our Judgements
  </span>
</h3>
        <div className="row">
          {/* Sidebar Column */}
          <div className="col-lg-4">
            <CoursesSidebar onCategorySelect={handleCategorySelect} />
          </div>

          {/* Main Content Column */}
          <div className="col-lg-8">
            {children}
            {/* <div className="td_height_60 td_height_lg_40" /> */}
          </div>
        </div>
      </div>
      {/* <div className="td_height_120 td_height_lg_80" /> */}
    </section>
  );
};