import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/layout/header/Header";
import Home from "./components/pages/home/Home";

function App() {
  let routes = [
    {
      id: 1,
      path: "/",
      element: <Home />,
    },
  ];

  return (
    <div className="app">
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route key={el.id} path={el.path} element={el.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
