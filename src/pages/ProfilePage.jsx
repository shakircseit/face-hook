import { useEffect } from "react";
import { actions } from "../actions";
import MyPost from "../components/profile/MyPost";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";
const ProfilePage = () => {
  //  const [user,setUser]=useState(null);
  //  const [posts,setPosts]=useState([]);
  //  const [loading,setLoading]=useState(false)
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    // setLoading(true)
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        console.log(response.data);
        //    setUser(response?.data?.user)
        //    setPosts(response?.data?.posts)
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);
  if (state.loading) {
    return <div>Fetching Data.....</div>;
  }
  return (
    <>
      <ProfileInfo />
      <MyPost />
    </>
  );
};

export default ProfilePage;
