import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
import MapDisplayWithMarkersPage from "../pages/MapDisplayWithMarkersPage";
import UserLocationAndSearchPage from "../pages/UserLocationAndSearchPage";
import DirectionsFunctionalityPage from "../pages/DirectionsFunctionalityPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "Map-Display-with-Markers",
        element: <MapDisplayWithMarkersPage />,
    },
    {
        path: "User-Location-and-Search",
        element: <UserLocationAndSearchPage />,
    },
    {
        path: "Directions-Functionality",
        element: <DirectionsFunctionalityPage />,
    },
]);

export default router;
