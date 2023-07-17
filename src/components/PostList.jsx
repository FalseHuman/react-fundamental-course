import React from "react";
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map( (post) => 
                    <PostItem remove={remove} post={post}  key={post.id}/>
            )}
        </div>
    )
};

export default PostList;