import { useEffect } from "react";
import { actions } from "../actions";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import useAxios from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";
const Homepage = () => {
  const { api } = useAxios();
  const { state, dispatch } = usePost();
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          const sortedPosts = response.data.sort((a, b) => {
            const dateA = a.createAt ? new Date(a.createAt).getTime() : 0;
            const dateB = b.createAt ? new Date(b.createAt).getTime() : 0;
            return dateB - dateA;
          });

          dispatch({ type: actions.post.DATA_FETCHED, data: sortedPosts });
        }
      } catch (error) {
        console.error(error.message);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state?.loading) {
    return <div>We are working...</div>;
  }
  if (state?.error) {
    return <div>Error in Fetching Posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
};

export default Homepage;
