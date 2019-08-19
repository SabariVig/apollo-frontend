import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PostList from "../components/PostList";


const Home = () => {
  const {
    
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS);
  return (
    <div>
        
            {posts &&posts.map(post=>(<PostList data={post} key={post.id}/>))}
        
      {posts && console.log(posts)}
    </div>
  );
};

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;

export default Home;
