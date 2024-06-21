import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/tokenSlice";
import {
  checkLast20Seen,
  getNotification,
  setLast20Seen,
  setNotification,
} from "./store/notificationSlice";
import useWebSocket from "./hooks/WebSocket"; // Import the custom hook
import { useGetProfileByToken } from "./functions/UseQuery/ProfileInfo";
import { useNotifData } from "./functions/UseQuery/notifQuery";
import ProtectedRoute from "./functions/ProtectedRoute/Profile";
import { ProtectedRouteDisConnected } from "./functions/ProtectedRoute/Main";
import "./App.scss";
import SignIn from "./pages/sign_in/sign_in";
import SignUp from "./pages/sign_up/sign_up";
import Main from "./pages/main/main";
import SignInG from "./pages/sign_in_google/sign_in_g";
import RedGoogle from "./pages/redirectionGoogle";
import Profile from "./pages/profile/profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Support from "./pages/Support/Support";
import PrivacyPolicy from "./pages/Pricavy_Tearms/Privacy Policy/Privacy_Policy";
import Tearms from "./pages/Pricavy_Tearms/Terms_and_Conditions/Tearms";
import Tasks from "./pages/Tasks/TaskManager/Tasks";
import Status from "./pages/Tasks/status/status";
import ReferFriend from "./pages/ReferFriend/referFriend";
import TaskTypes from "./pages/TaskTypes/TaskTypes";
import TaskHome from "./pages/TaskTypes/TaskHome";
import SignInL from "./pages/sign_in_linkedin/sign_in_l";
import RedLinkedin from "./pages/redirectionLinkedin";
import ProjectManagerPage from "./pages/project/projectManager";
import ForgotPassword from "./pages/Forgot_Password/Forgot_password";
import ResetPasswordForm from "./pages/Forgot_Password/Forgot_password_form";
import Test from "./test/main";
import Discution from "./pages/Discutions/Discution";
import VerifierEmail from "./pages/VerifierEmail/VerifierEmail";
import LandingPage from "./pages/LandingPage/landingPage";
import PricingPage from "./pages/Pricing/Pricing";
import Success from "./layouts/Support/Body/Succuss";
import Fail from "./layouts/Support/Body/Fail";
import { useMediaQuery } from "react-responsive";
import Loader from "./drawables/loader/Loader";
function App() {
  const { refetch } = useGetProfileByToken();
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);
  const notifState = useSelector(getNotification);
  const { notifs } = notifState || {};
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const {
    data: dataNotif,
    refetch: refetchNotif,
    isLoading,
  } = useNotifData(user?._id);

  useWebSocket(user, dataNotif, refetchNotif);
  console.log("userrrr00", user);
  useEffect(() => {
    const Seen = checkLast20Seen(dataNotif);
    dispatch(setLast20Seen(Seen));
  }, [dataNotif, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (notifs) {
      dispatch(setNotification(notifs));
    }
  }, [dispatch, notifs]);


  return isLoading ? (
 <Loader />
  ) : (
    <Router>
      <ToastContainer />
      <Routes>
        {isSmallScreen ? (
          <Route
            path="/"
            element={<ProtectedRouteDisConnected element={<LandingPage />} />}
          />
        ) : (
          <>
            <Route
              path="/"
              element={<ProtectedRouteDisConnected element={<LandingPage />} />}
            />
            <Route
              path="/sign_up"
              element={<ProtectedRouteDisConnected element={<SignUp />} />}
            />
            <Route
              path="/sign_in"
              element={<ProtectedRouteDisConnected element={<SignIn />} />}
              // element={<SignIn />}
            />
            <Route
              path="/redGoogle"
              element={<ProtectedRouteDisConnected element={<RedGoogle />} />}
            />
            <Route
              path="/sign_in_google"
              element={<ProtectedRouteDisConnected element={<SignInG />} />}
            />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/VerifierEmail" element={<VerifierEmail />} />

            <Route
              path="/forgot_password/:token"
              element={<ResetPasswordForm />}
            />
            <Route
              path="/sign_in_Linkedin"
              element={<ProtectedRouteDisConnected element={<SignInL />} />}
            />
            <Route
              path="/redLinkedin"
              element={<ProtectedRouteDisConnected element={<RedLinkedin />} />}
            />

            <Route
              path="/pricing"
              element={<ProtectedRouteDisConnected element={<PricingPage />} />}
              // element={<PricingPage />}
            />
            <Route
              path="/policy"
              element={<ProtectedRoute element={<PrivacyPolicy />} />}
            />
            <Route
              path="/tearm"
              element={<ProtectedRoute element={<Tearms />} />}
            />

            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
              // element={<Profile />}
            />
            <Route
              path="/Supp"
              element={<ProtectedRoute element={<Support />} />}
            />
            <Route
              path="/tasks/:idProject"
              element={<ProtectedRoute element={<Tasks />} />}
            />
            <Route
              path="/test"
              element={<ProtectedRoute element={<Test />} />}
            />
            <Route
              path="/Ref"
              element={<ProtectedRoute element={<ReferFriend />} />}
            />
            <Route
              path="/tasktypes"
              element={<ProtectedRoute element={<TaskTypes />} />}
            />
            <Route
              path="/taskhome/:userId/:taskId"
              element={<ProtectedRoute element={<TaskHome />} />}
            />
            <Route
              path="/projects"
              element={<ProtectedRoute element={<ProjectManagerPage />} />}
            />
            <Route
              path="/main"
              element={<ProtectedRouteDisConnected element={<Main />} />}
            />
            <Route
              path="/disc/:id"
              element={<ProtectedRoute element={<Discution />} />}
            />
            <Route
              path="/dash"
              element={<ProtectedRoute element={<Dashboard />} />}
              // element={<Dashboard />}
            />
            <Route path="/success" element={<Success />} />
            <Route path="/fail" element={<Fail />} />
            <Route
              path="/tasks"
              element={<ProtectedRoute element={<Tasks />} />}
            />
            <Route
              path="/taskstatus/:id"
              element={<ProtectedRoute element={<Status />} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
