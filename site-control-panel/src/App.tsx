import React from 'react';
import "./styles/style.css";
import AppLayout from './components/appLayout/appLayout';
import { 
    RouterProvider, 
    createBrowserRouter,
    Routes, 
    Route 
} from 'react-router-dom';
import Products from './components/product';
import path from 'path';
import Categories from './components/category';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "product",
                element: <Products />,
                children: [
                    {
                        path: ":id",
                        element: <Products />
                    }
                ]
            },
            {
                path: "present",
                element: <div>pres</div>
            },
            {
                path: "category",
                element: <Categories />
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
