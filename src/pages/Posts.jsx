import React, {useEffect, useState} from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import Loader from '../components/UI/loader/Loader';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../components/API/PostService';
import useFetching from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {
  const [posts, setPosts] = useState([]);


  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page)=> {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'] 
      setTotalPages(getPageCount(totalCount, limit))
  })

  console.log(totalPages)
  useEffect(() => {
    fetchPosts(limit, page);
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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
      <Pagination 
        pagesArray={pagesArray} 
        page={page} 
        changePage={changePage}/>
    </div>
  );
}

export default Posts;