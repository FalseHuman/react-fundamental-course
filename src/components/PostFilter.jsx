import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";


const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput 
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder='Search...'
            />
            <h1 style={{textAlign: 'center'}}>Sorting:</h1>
            <MySelect 
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[{name: 'On title', value: 'title'}, {name: 'On body', value: 'body'}]} defaultValue={'Change sorting'}
            />
      </div>
    ) 
};

export default PostFilter;