import {RouterProvider} from "react-router-dom";
import Router from "./router/Router"
import './App.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()

  // const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={Router} />
    </QueryClientProvider>

   
  )
}

export default App
