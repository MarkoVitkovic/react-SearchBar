/*
----------
An assignment is to implement basic search/filtering functionality.

When the user types inside the search field:

- search field should be case insensitive, meaning that if the post contains the
word "eye" it should NOT be hidden even if the user types Eye, EYE, eYe, eYE, etc.

- if the post's title or body does not contain the inputted text, the post
should be hidden.

- if the input field is cleared, all posts should be shown.

The text next to the search field:

- if the search field is empty, it should say: Type to filter.

- if no posts are found, it should say: No posts found.

- if there are posts found, it should say (X = number of found posts): Found X posts.

Posts should be fetched from the following API: https://jsonplaceholder.typicode.com/posts

NOTE: When searching/filtering, no subsuquent API requests should be made.

HTML structure of the search part could look like this:

<label>
  <input type="search" id="search" placeholder="Search...">
  <span id="message">Type to filter.</span>
</label>

HTML structure of each post could look like this:

<div class="post">
  <h3 class="post-title">This is a post title.</h3>
  <p class="post-body">This is a post content.</p>
</div>

An example of a working demo:
https://drive.google.com/file/d/1urCBesGmzH-ELQ1Bv8XtbpI2X3JL9XbH/view?usp=sharing
----------
*/

import React, { Component } from 'react';
import "./style.css";
import Axios from 'axios';

export default class App extends Component {
  constructor(props){
        super(props);
  }
  state = {
      posts: [],
      search: null,
      texts: "Type to search"
  }
   componentDidMount(){ 
        this.getData();
    };
     async getData(){
        const resource = await Axios.get("https://jsonplaceholder.typicode.com/posts");
        this.setState({
          posts: resource.data
        });
        console.log(resource);
    }
    searchFunction=(event)=>{
    let word = event.target.value;
    this.setState({search: word})
  }
render(){
  const items = this.state.posts.filter(data=>{
    if(this.state.search == null)
        return data
    if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.body.toLowerCase().includes(this.state.search.toLowerCase()))
          return data
  }).map(data=>{
      return(
      <div>
        <h3 class="title">{data.title}</h3>
        <p class="body">{data.body}</p>
      </div>
      )
    })
    return (
       <label>
        <input type="search" id="search" placeholder="Search..." onChange={(e)=>this.searchFunction(e)}/>
        <span id="message">{this.state.count}</span>
        {items}
      </label>
    )
  
}
}
