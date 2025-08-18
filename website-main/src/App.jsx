import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

// Custom Hooks
import { useWow } from "./lib/hooks/useWow";

// Redux Actions
import { fetchRoutes } from "./Redux/features/routes/routesSlice";
import { fetchSeo } from "./Redux/features/seo/seoSlice";

// Common Components
import SEO from "./common/Seo";
import { Error } from "./pages/error/Error";

// Page Components
import { HomeOne } from "./pages/home/HomeOne";
import { CoursesGridView } from "./pages/course/CoursesGridView";
import { CoursesListView } from "./pages/course/CoursesListView";
import { CoursesDetails } from "./pages/course/CoursesDetails";
import { About } from "./lib/about/About";
import { AboutInstitute } from "./lib/about/AboutInstitute";
import { AboutWhy } from "./lib/about/AboutWhy";
import { Event } from "./pages/event/Event";
import { EventDetails } from "./pages/event/EventDetails";
import { TeamMembers } from "./pages/team/TeamMembers";
import { TeamMemberDetails } from "./pages/team/TeamMemberDetails";
import { Faq } from "./pages/faq/Faq";
import { Blog } from "./pages/blogs/Blog";
import { BlogWithSidebar } from "./pages/blogs/BlogWithSidebar";
import { BlogDetails } from "./pages/blogs/BlogDetails";
import { Contact } from "./pages/contact/Contact";
import { Enquiry } from "./pages/enquiry/Enquiry";
import { Enroll } from "./pages/enroll/Enroll";
import { SyllabusDownload } from "./pages/syllabus/Syllabus";
import { JudicialServices } from "./pages/syllabus/JudicialServices";
import { DirectorMessage } from "./lib/about/DirectorMessage";
import SuccessStories from "./components/success/SuccessStories";
import BiharPerlims from "./pages/syllabus/BiharPerlims";
import HimanchalHaryana from "./pages/syllabus/HimanchalHaryana";
import JharkhandPrelims from "./pages/syllabus/JharkhandPerlims";
import PrivacyPolicy from "./pages/privacy/Privacy";
import { Judgement } from "./pages/course/Judgement";
import { JudgementDetails } from "./pages/course/JudgementDetails";
import OnlineClassesPage from "./pages/online/OnlineClassesPage";
import { Pretestseries } from "./testseries/Pretestseries";
import CoursesSummry from "./components/courses/CoursesSummry";
import CouresesFull from "./components/courses/CouresesFull";
import { Foundation } from "./pages/course/Foundation";
import DetailSection from "./components/fun_facts/WhatsNewDetail";
import CoursesPage from "./pages/course/CoursesOne";
import FoundationCourses from "./pages/course/FoundationCourse";
import CourseLayout from "./pages/course/CourseLayout";
import TestSeriesdeatil from "./pages/TestSeries/TestSeriesdeatil";
import MainSeriesdeatils from "./pages/TestSeries/MainSeriesdeatils";
import OtherCourse from "./components/courses/OtherCourse";
import CourseNew from "./pages/course/CourseNew";
import CourseLayoutOne from "./pages/course/CourseLayoutOne";
import OtherCoursePage from "./pages/course/OtherCourse";

const componentMap = {
  // Core Pages
  HomeOne,
  About,
  AboutInstitute,
  AboutWhy,
  Contact,
  Error,
  Faq,
  PrivacyPolicy,
  SuccessStories,

  // Course Pages
  CoursesGridView,
  CoursesListView,
  CoursesDetails,
  CoursesSummry,
  CouresesFull,
  Foundation,
  FoundationCourses,
  CourseLayout,
  CourseLayoutOne,
  CourseNew,
  OtherCourse,
  OtherCoursePage,
  CoursesOne: CoursesPage,

  // Blog Pages
  Blog,
  BlogWithSidebar,
  BlogDetails,

  // Event Pages
  Event,
  EventDetails,

  // Team Pages
  TeamMembers,
  TeamMemberDetails,

  // Syllabus Pages
  SyllabusDownload,
  JudicialServices,
  BiharPerlims,
  HimanchalHaryana,
  JharkhandPrelims,

  // Other Pages
  DirectorMessage,
  Enquiry,
  Enroll,
  Judgement,
  JudgementDetails,
  OnlineClassesPage,
  DetailSection,

  // Test Series Pages
  Pretestseries,
  TestSeriesdeatil,
  MainSeriesdeatils,
};

// Constants
const WHATSAPP_NUMBER = "918888888888";
const CANONICAL_BASE_URL = "https://aashayeinjudiciary.com";
const DEFAULT_SEO_TITLE = "Aashayein Judiciary";

/**
 * The main application component.
 * It handles routing, SEO, and global UI elements like the WhatsApp and inquiry icons.
 */
function App() {
  // Initializes the WOW.js library for animations.
  useWow();

  // Redux dispatch function.
  const dispatch = useDispatch();
  // Gets the current URL path.
  const { pathname } = useLocation();

  // Fetches routes and SEO data from the Redux store.
  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );
  const { seoData, loading: seoLoading } = useSelector((state) => state.seo);

  // Determines if the application is in a loading state.
  const isLoading = routesLoading || seoLoading;

  // Scrolls to the top of the page on route changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Fetches initial data for routes and SEO.
  useEffect(() => {
    dispatch(fetchRoutes());
    dispatch(fetchSeo());
  }, [dispatch]);

  // Displays a loading indicator while data is being fetched.
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>
    );
  }

  return (
    <>
      {/* Sets up the application's routing. */}
      <Routes>
        {routesData.map((route, index) => {
          // Gets the component for the current route, or a fallback Error component.
          const Page = componentMap[route.element] || Error;

          // Finds the SEO data for the current page.
          const seoForPage =
            seoData.find((seo) => seo.path === route.path) || {};

          // Wraps the page component with SEO metadata.
          const PageWithSEO = () => (
            <>
              <SEO
                title={seoForPage.title || DEFAULT_SEO_TITLE}
                description={seoForPage.description}
                keywords={seoForPage.keywords}
                canonical={`${CANONICAL_BASE_URL}${seoForPage.path ||
                  route.path}`}
              />
              <Page />
            </>
          );

          return (
            <Route key={index} path={route.path} element={<PageWithSEO />} />
          );
        })}

        {/* Fallback route for any path that doesn't match. */}
        <Route path='*' element={<Error />} />
      </Routes>

      {/* WhatsApp & Inquiry icons */}
      <div className='fixed-icons'>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target='_blank'
          rel='noopener noreferrer'
          className='whatsapp-icon'
        >
          <FaWhatsapp size={30} />
        </a>
        <a href='/contact' className='inquiry-icon'>
          <FaPhone size={30} />
        </a>
      </div>

      <style>{`
        /* Container for the fixed icons */
        .fixed-icons {
          position: fixed;
          bottom: 50px;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          z-index: 1050; /* High z-index to appear on top of other content */
          pointer-events: none; /* Allows clicks to pass through the container */
        }

        /* Styling for both WhatsApp and Inquiry icons */
        .whatsapp-icon,
        .inquiry-icon {
          pointer-events: auto; /* Re-enables pointer events for the icons themselves */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
          text-decoration: none;
          transition: transform 0.3s ease; /* Smooth scaling transition on hover */
        }

        /* Specific styling for the WhatsApp icon */
        .whatsapp-icon {
          position: fixed;
          left: 20px;
          bottom: 20px;
          background: #25D366; /* WhatsApp green */
          z-index: 999999999; /* Ensures it's on top */
        }

        /* Specific styling for the Inquiry icon */
        .inquiry-icon {
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: #ff5722; /* A shade of orange */
          z-index: 999999999; /* Ensures it's on top */
        }

        /* Hover effect for both icons */
        .whatsapp-icon:hover,
        .inquiry-icon:hover {
          transform: scale(1.1); /* Slightly enlarges the icon on hover */
        }
      `}</style>
    </>
  );
}

export default App;
