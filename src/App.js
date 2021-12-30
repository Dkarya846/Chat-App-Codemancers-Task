import React, { useState } from "react";

import CreatePost from "./components/CreatePost/CreatePost";
import { Container } from "@mui/material";
import Post from "./components/Post/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      content: "I feel like....",
      gif: "https://media1.giphy.com/media/DhstvI3zZ598Nb1rFf/giphy.gif?cid=d412b070x5hjb6etn4l8170e1oaw4dqx2z3seswkoflnkgux&rid=giphy.gif&ct=g",
    },
    {
      content: "I don't wanna do it",
      gif: "https://media2.giphy.com/media/l2Ject9fem5QZOyTC/giphy.gif?cid=d412b070q3vuy6hdaca7gyvqno5cnde9g0h1tq6sooxhx6yr&rid=giphy.gif&ct=g",
    },
    {
      content: "Good Morning....",
      gif: "https://media2.giphy.com/media/sZtBSJH1jrFLVJc41D/giphy.gif?cid=d412b0705ccihu0x1dmzl0szf2seh2n6kcfg52j2xw2frxq5&rid=giphy.gif&ct=g",
    },
    {
      content: "Hello World...",
      gif: "https://media2.giphy.com/media/lcs5BL0NIM4WMv61a9/giphy.gif?cid=d412b070ni5qcpnu98kzw29flx2lif8puclzfssk3bpzuih9&rid=giphy.gif&ct=g",
    },
  ]);

  const handleCreatePost = (post) => {
    setPosts((prev) => [...prev, post]);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CreatePost handleCreatePost={handleCreatePost} />
      {posts.map((post, id) => (
        <Post key={id} post={post} />
      ))}
    </Container>
  );
}

export default App;
