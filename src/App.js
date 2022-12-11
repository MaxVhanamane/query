import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import {QueryClientProvider,QueryClient} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import RQSuperHeroPage from './components/RQSuperHero.page';
function App() {
  const queryClient= new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Router>
    <Layout/>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/super-heroes" element={<SuperHeroesPage />}/>
        <Route exact path="/rq-super-heroes" element={<RQSuperHeroesPage />}/>
        <Route exact path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />}/>
      </Routes>
  </Router>
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
  </QueryClientProvider>
      </>
  )
}

export default App
