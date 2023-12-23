import { Outlet } from 'react-router'

const Home = ({ Children }) => {
  return (
    <div>
      {Children}
      dddddddddddddddddddddddd
      <Outlet/>
    </div>
  )
}

export default Home
