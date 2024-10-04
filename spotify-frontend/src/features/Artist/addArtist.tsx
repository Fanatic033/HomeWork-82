import ArtistForm from "./components/ArtistForm.tsx";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectIsCreating } from "./ArtistSlice.ts";
import { selectUser } from "../User/UserSlice.ts";
import { mutationArtist } from "../../types.ts";
import { createArtist } from "./ArtistThunks.ts";

const AddArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreating);
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/" />;
  }

  const onFormSubmit = async (artist: mutationArtist) => {
    try {
      await dispatch(createArtist(artist));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ArtistForm onSubmit={onFormSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddArtist;
