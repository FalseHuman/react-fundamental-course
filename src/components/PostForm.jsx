import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', description: ''});
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        // setPosts([...posts, {...post, id: Date.now()}]);
        setPost({title: '', description: ''});
      }
    
    return (
        <form>
            {/* Управляемый компонент*/}
            <MyInput 
                type='text' 
                placeholder='Title Post'
                onChange={e => setPost({...post, title: e.target.value})}
                value={post.title} 
            />
            <MyInput 
                type='text' 
                placeholder='Description Post'
                onChange={e => setPost({...post, description: e.target.value})}
                value={post.description}
            />
            <MyButton onClick={e  => addNewPost(e)}>Create</MyButton>
      </form>
    )
};

export default PostForm;