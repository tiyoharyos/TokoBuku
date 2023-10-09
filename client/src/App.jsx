import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SharedLayout from './SharedLayout';
import Intro from './components/Intro';
import LisBuku from './components/ListBuku';
import ListPenerbit from './components/ListPenerbit'

function App() {
  const myBG = {
    // background: '#171717',
  };
  return (
    <div style={myBG}>
   <BrowserRouter>
   <div className='Intro'>
   <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Intro />} />
          <Route path='LisBuku' element={<LisBuku />} />
          <Route path='ListPenerbit' element={<ListPenerbit />} />
          {/* <Route path='SuperHero' element={<SuperHero />} />
          <Route path='ListFilm' element={<ListFilm />} /> */}
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;