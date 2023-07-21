import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import PostIdPages from "../pages/PostIdPages";

function AppRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" Component={Posts}/>
                <Route path="/:id" Component={PostIdPages}/>
                <Route path="/about" Component={About}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    )
};

export default AppRouter;