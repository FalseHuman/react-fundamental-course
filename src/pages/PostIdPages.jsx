import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import PostService from "../components/API/PostService";
import useFetching from "../hooks/useFetching";
import Loader from '../components/UI/loader/Loader'
import PostIdPagesComment from "./PostidPagesComment";

const PostIdPages = (props) => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostById, isLoading, error] = useFetching(async (id)=>{
        const response = await PostService.getbyId(id)
        setPost(response.data)
    })
    useEffect(() =>{
        fetchPostById(params.id);
    })
    return (
        <div>
            <h1>post page with {params.id}</h1>
            <p>{post.title} {post.body}</p>
            <h1>Comments</h1>
            <PostIdPagesComment />
            {/* {isLoading 
                ? <Loader />
                : <p>{post.title} {post.body}</p>
            } */}
        </div>
    );
}

export default PostIdPages;