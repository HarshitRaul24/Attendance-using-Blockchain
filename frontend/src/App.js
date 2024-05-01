import { Routes,Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import FacultySignup from "./Components/Signup/FacultySignup"
import StudentSignup from "./Components/Signup/StudentSignup";
import FCreateAttendance from "./Components/Dashboard/Faculty/FCreateAttendance"
import FDashboard from "./Components/Dashboard/Faculty/FDashboard"
import FValidateStudent from "./Components/Dashboard/Faculty/FValidateStudent"
import FViewAttendance from "./Components/Dashboard/Faculty/FViewAttendance"
import HCreateAttendance from "./Components/Dashboard/HOD/HCreateAttendance"
import HDashboard from "./Components/Dashboard/HOD/HDashboard"
import HValidateAttendance from "./Components/Dashboard/HOD/HValidateAttendance"
import HValidateFaculty from "./Components/Dashboard/HOD/HValidateFaculty"
import HValidateStudent from "./Components/Dashboard/HOD/HValidateStudent"
import HViewAttendance from "./Components/Dashboard/HOD/HViewAttendance"
import SDashboard from "./Components/Dashboard/Student/SDashboard"
import SMarkAttendance from "./Components/Dashboard/Student/SMarkAttendance"
import SViewAttendance from "./Components/Dashboard/Student/SViewAttendance"
import AddAttendance from "./Components/AddData";
import AttendanceDisplay from "./Components/AttendanceDisplay";
import EditAttendancePage from "./Components/Dashboard/Faculty/EditAttendancePage";

function App() {
  return (
    <>
      <Routes>
        {/* Login Signup */}
        <Route path="/" element={<Login />} />
        <Route path="/facultysignup" element={<FacultySignup />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        {/* Faculty */}
        <Route path="/fdashboard" element={<FDashboard />} />
        <Route path="/fcreateattendance" element={<FCreateAttendance />} />
        <Route path="/fvalidatestudent" element={<FValidateStudent />} />
        <Route path="/fviewattendance" element={<FViewAttendance />} />
        <Route path="/editattendance/:id" element={<EditAttendancePage/>}/>
        {/* HOD */}
        <Route path="/hdashboard" element={<HDashboard />} />
        <Route path="/hcreateattendance" element={<HCreateAttendance />} />
        <Route path="/hvalidateattendance" element={<HValidateAttendance />} />
        <Route path="/hvalidatefaculty" element={<HValidateFaculty />} />
        <Route path="/hvalidatestudent" element={<HValidateStudent />} />
        <Route path="/hviewattendance" element={<HViewAttendance />} />
        {/* Student */}
        <Route path="/sdashboard" element={<SDashboard />} />
        <Route path="/smarkattendance" element={<SMarkAttendance />} />
        <Route path="/sviewattendance" element={<SViewAttendance />} />
        <Route path="/add" element={<AddAttendance/>}/>
        <Route path="/display" element={<AttendanceDisplay/>}/>
      </Routes>
    </>
  );
}

export default App;