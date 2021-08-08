import React from "react";
import { Navigate } from "react-router-dom";
import pages from "./pages";

const routes = (login) => [
  // {
  //   path: 'app',
  //   element: login ? <DashboardLayout /> : <Navigate to="/login" />,
  //   children: [
  //     { path: 'account', element: <Account /> },
  //     {
  //       path: 'report',
  //       children: [
  //         { path: '', element: <Report /> },
  //         { path: 'add', element: <AddReport /> },
  //       ],
  //     },
  //     { path: '*', element: <Navigate to="/notFound" /> },
  //   ],
  // },
  // {
  //   path: '/',
  //   element: !login ? <MainLayout /> : <Navigate to="/app/report" />,
  //   children: [
  //     { path: '', element: <Navigate to="/login" /> },
  //     { path: 'login', element: <Login /> },
  //     { path: 'register', element: <Register /> },
  //     { path: '*', element: <Navigate to="/notFound" /> },
  //   ],
  // },
  // {
  //   path: '/notFound',
  //   element: <MainLayout />,
  //   children: [{ path: '', element: <NotFound /> }],
  // },
  {
    path: "/",
    element: login ? <Navigate to="/home" /> : <pages.Register />,
  },
  {
    path: "/home",
    element: login ? <pages.Profile /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: login ? <Navigate to="/home" /> : <pages.Login />,
  },
  {
    path: "/update",
    element: login ? <pages.EditProfile /> : <Navigate to="/login" />,
  },
];

export default routes;
