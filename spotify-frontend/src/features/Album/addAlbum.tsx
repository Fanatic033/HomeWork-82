import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../User/UserSlice.ts";
import { mutationAlbum } from "../../types.ts";
import AlbumForm from "./components/AlbumForm.tsx";
import { createAlbum } from "./AlbumThunks.ts";
import { selectIsCreatingAlbum } from "./AlbumSlice.ts";

const AddAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsCreatingAlbum);

  if (!user) {
    return <Navigate to="/" />;
  }

  const onFormSubmit = async (album: mutationAlbum) => {
    try {
      await dispatch(createAlbum(album));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AlbumForm onSubmit={onFormSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddAlbum;
