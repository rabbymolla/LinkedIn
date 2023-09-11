import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./Pages/Login";
import Ragistration from "./Pages/Ragistration";
import PhonNumber from "./Commponent/PhonNumber";
import Home from "./Pages/Home";
import NotLogin from "./PrivetRuter/NotLoginSlice";
import Logdin from "./PrivetRuter/LogdinSlice";
import Forget from "./Pages/Forget";
import RootLayOut from "./RootLayOut";
import Messaging from "./Pages/Message";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/Profile";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Logdin />}>
          <Route element={<RootLayOut />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/message" element={<Messaging />}></Route>
            <Route path="/notification" element={<Notifications />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Route>
        <Route element={<NotLogin />}>
          <Route path="/ragistration" element={<Ragistration />} />
          <Route path="/phone" element={<PhonNumber />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forget />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
