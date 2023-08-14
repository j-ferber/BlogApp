import { useContext } from "react";
import { PostsContext } from "../Context/postsContext";

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (!context) throw Error('Wrong use of usePostsContext')
  return context
}