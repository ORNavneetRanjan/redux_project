import { Route, Routes } from "react-router-dom";
import ShowDetailPage from "./Pages/ShowDetails.Page";
import ShowListPage from "./Pages/ShowsList.Page";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <Routes>
        <Route path="/" element={<ShowListPage />} />
        <Route path="show/:showId" element={<ShowDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
