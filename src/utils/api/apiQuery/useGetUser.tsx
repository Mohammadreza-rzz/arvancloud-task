import { useQuery } from "@tanstack/react-query"
import { getuserApi } from "../apiFunction"

const useGetUser = (queryKey: string[]) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: getuserApi,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (!!data) {
        return data?.data?.user
      } else {
        return []
      }
    },
  })
  return query
}

export default useGetUser
