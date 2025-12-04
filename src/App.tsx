import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, LessonPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
