import React, { useState } from "react";

import { Alert, TextareaAutosize } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

//importing styling
import "./CreatePost.styles.css";

const CreatePost = (props) => {
  const { handleCreatePost } = props;

  const [addGIF, setAddGIF] = useState();
  const [postText, setPostText] = useState();
  const [selectedGIF, setSelectedGIF] = useState();
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

  const [searchedGIF, setSearchedGIF] = useState([]);

  //Submit Post Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePost({ content: postText, gif: selectedGIF });
    setSelectedGIF(null);
    setPostText("");
    setSearchText("");
    setAddGIF(false);
  };

  //Searching a GIF with given text
  const handleSearchGIF = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${process.env.REACT_APP_KEY}`;
    try {
      const { data } = await axios.get(url);

      //Clearing previously Searched result
      setSearchedGIF([]);
      setSearchedGIF(data.data.map((data) => data.images.original.url));
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status <= 500
      ) {
        setError(ex.response.data);
      } else {
        alert("Unknown Error");
      }
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}
      {/* Create Post Content Container  */}
      <div className="message-container">
        <TextareaAutosize
          aria-label="create your post"
          placeholder="Create your post"
          required={true}
          className="post-text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        {/* Showing GIF in post if exist */}
        <div
          style={{ display: selectedGIF ? "block" : "none" }}
          className="post-gif-con"
        >
          <img className="gif" draggable={false} src={selectedGIF} alt="fig" />
          <CancelIcon
            className="remove-gif"
            onClick={() => setSelectedGIF(null)}
          />
        </div>
      </div>

      {/* adding a GIF and Post option */}
      <div className="options">
        <div
          className="add-gif-button"
          onClick={() => setAddGIF((prev) => !prev)}
        >
          <AddIcon sx={{ marginRight: "0.25rem" }} />
          GIF
        </div>
        <button className="post-button" type="submit">
          <EditIcon sx={{ fontSize: "1.2rem", marginRight: "0.25rem" }} />
          Post
        </button>

        {/* Searching a gif  */}
        <div
          style={{ display: addGIF ? "flex" : "none" }}
          className="fetched-gif-container"
        >
          <div className="search-gif">
            <input
              type="text"
              value={searchText}
              className="search-input"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={handleSearchGIF}
              type="button"
              className="search-button"
            >
              <SearchIcon />
            </button>
          </div>

          {/* Showing the searched results  */}
          <div className="results">
            {searchedGIF.map((url, id) => (
              <img
                key={id}
                className="gif-preview"
                src={url}
                alt="fig"
                onClick={() => setSelectedGIF(url)}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
