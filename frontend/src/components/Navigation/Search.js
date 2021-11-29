import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/posts";
import "./Navigation.css";

function SearchResults({ search, setSearchValues, setSearch }) {
     const dispatch = useDispatch();
const allPosts = useSelector((store) => store.postReducer?.posts);

 document.querySelector("html").addEventListener("click", () => {
   setSearchValues(false);
   setSearch("");
 });

 let posts;
 if (allPosts) {
   posts = Object.values(allPosts);
 }
 
 const results = posts?.filter((post) =>
   post.title?.toLowerCase().includes(search.toLowerCase())
 );

    return (
      <div className="searchDiv">
        <ul>
          {results !== null ? (
            <>
              {results?.map((post) => (
                <li>
                  <NavLink key={post.id} to={`/posts/${post.id}`} className="resultLink">
                    <div>
                      <div>
                        <div>{post.title}</div>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </>
          ) : null}
        </ul>
      </div>
    );
}

export default SearchResults;