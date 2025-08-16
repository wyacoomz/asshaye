import React from "react";
import { Link } from "react-router-dom";

import calendarIcon from "../../assets/img/icons/calendar.svg";
import userIcon from "../../assets/img/icons/user.svg";
import { useSelector } from "react-redux";

const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const BlogItem = ({
  image,
  date,
  author,
  title,
  excerpt,
  blogUrl,
}) => {
  const slug = generateSlug(blogUrl);

  return (
    <div className='td_post td_style_1'>
      <Link to={`/blog-details/${slug}`}>
        <div id='block-section' className='td_post_thumb d-block'>
          <img src={image} alt={title} />
          <i className='fa-solid fa-link'></i>
        </div>

        <div className='td_post_info'>
          <div className='td_post_meta td_fs_14 td_medium td_mb_20'>
            <span>
              <img
                style={{ objectPosition: "top" }}
                src={calendarIcon}
                alt='calendar icon'
              />
              {date}
            </span>

            <span>
              <img src={userIcon} alt='user icon' />
              {author}
            </span>
          </div>

          {/* <h2>bjdfnsdfnksdknsdsndsnk</h2> */}
          <p className='td_post_subtitle td_mb_24 td_heading_color td_opacity_7'>
            {excerpt}
          </p>

          <div className='td_btn td_style_1 td_type_3 td_radius_30 td_medium'>
            <span className='td_btn_in td_accent_color'>
              <span>Read More</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
