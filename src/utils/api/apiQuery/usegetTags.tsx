import { useQuery } from "@tanstack/react-query"
import { getTagsApi } from "../apiFunction"

const useGetUser = (queryKey: string[]) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: getTagsApi,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (!!data) {
        return data?.data
      } else {
        return []
      }
    },
  })
  return query
}

export default useGetUser
