import React, {useEffect, useState} from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import Loader from './components/UI/loader/Loader';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './components/API/PostService';
import useFetching from './hooks/useFetching';

function App() {
  const [posts, setPosts] = useState([]);


  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostLoading, postError] = useFetching( async ()=> {
      const posts = await PostService.getAll()
      setPosts(posts);
  })

  useEffect(() => {
    fetchPosts();
  }, [filter])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Open Form</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost} /></MyModal>
      {/*<PostForm create={createPost} />*/}
      <PostFilter filter={filter} setFilter={setFilter}/>
      <hr style={{margin: '15px 0'}} />
      {postError && <p>Fail: {postError}</p>}
      {isPostLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List'/>
      }
    </div>
  );
}

export default App;
