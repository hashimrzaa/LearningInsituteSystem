import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdmissionForm from "../../Screens/AdmissionPage/AdmissionForm";
import StudentDashboard from "../../Screens/StudentDashboard/StudentDashboard";
import AdminDashboard from "../../Screens/AdminDashboard/AdminDashboard";
import Login from "../../Screens/Login/Login";
import AddCourse from "../../Screens/AdminDashboard/CreateCourse/AddCourse";
import AllCourses from "../../Screens/AdminDashboard/AllCourses/AllCourses";
import AllStudent from "../../Screens/AdminDashboard/AllStudents/AllStudent";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Singlecourse from "../../Screens/AdminDashboard/SingleCourse/singlecourse";
import Singlestudent from "../../Screens/AdminDashboard/AllStudents/Singlestudent";
import SinglecourseStd from "../../Screens/StudentDashboard/SinglecourseStd";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutes component={<StudentDashboard />} />}
        />
        <Route
          path="/singlecourse/:id"
          element={<ProtectedRoutes component={<SinglecourseStd />} />}
        />
        <Route path="admissionform" element={<AdmissionForm />} />
        <Route path="login" element={<Login />} />
        <Route
          path="adminpannel"
          element={<ProtectedRoutes component={<AdminDashboard />} />}
        >
          <Route path="" element={<AddCourse />} />
          <Route path="allstudents" element={<AllStudent />} />
          <Route
            path="allstudents/singlestudent/:id"
            element={<Singlestudent />}
          />
          <Route path="allcourses" element={<AllCourses />} />
          <Route
            path="allcourses/singlecourse/:id"
            element={<Singlecourse />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
