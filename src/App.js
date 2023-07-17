import React, {useState} from 'react';
// import Counter from './components/Counter';
// import ClassCounter from './components/ClassCounter';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {
  // const [value, setValue] = useState('Text');
  const [posts, setPosts] = useState([
    {id: 1, title: 'text 1', description: 'React Js is library'},
    {id: 2, title: 'text 2', description: 'React Js is library'},
    {id: 3, title: 'text 3', description: 'React Js is library'}
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('')


  function getSortedPosts() {
    if(selectedSort){
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <div>
        <MyInput 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Search...'
        />
        <h1 style={{textAlign: 'center'}}>Sorting:</h1>
        <MySelect 
          value={selectedSort}
          onChange={sortPosts}
          options={[{name: 'On title', value: 'title'}, {name: 'On description', value: 'description'}]} defaultValue={'Change sorting'}
        />
      </div>
      <hr style={{margin: '15px 0'}} />
      { posts.length !== 0 
        ? <PostList remove={removePost} posts={sortedPosts} title='List'/> 
        : <h1 style={{textAlign: 'center'}}>No list item</h1>}
    </div>
  );
}

export default App;
