"use client";

import { useEffect, useState } from "react";
import { useGetPostInfoQuery } from "../../app/services/post";
import Search from "/search.svg";
import { PostItem } from "../../interface/index"

export default function SideNav() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Partial<Omit<PostItem, 'content'>>>({})
  const { data, isLoading } = useGetPostInfoQuery();
  const sessionCategory = sessionStorage.getItem('category')

  const changeWord = (value: string) => {
    setSearchWord(value);
  }

  const filterPosts = (posts: Omit<PostItem, 'content'>[]) => {
    const filterPost = posts.filter((post: Omit<PostItem, 'content'>) => post.title.includes(searchWord))
    return filterPost
  }

  const selectPost = (post: Omit<PostItem, 'content'>) => {
    setSelectedPost(post)
  };

  useEffect(() => {
    if (!selectedPost?._id && !isLoading) {
      setSelectedPost(data?.data[0] as Omit<PostItem, 'content'>)
    }
  }, [isLoading, sessionCategory])

  return (
    <nav id="nav" className="lg:text-sm lg:leading-6">
      <div className="sticky top-0 -ml-0.5">
        <div className="h-6 bg-white"></div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img src={Search} alt="search Logo" width={16} height={16} />
          </div>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => changeWord(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 shadow-sm ring-1 ring-inset ring-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-700"
          />
        </div>
        <div className="bg-gradient-to-b from-white"></div>
      </div>
      <ul>
        {!isLoading && filterPosts(data?.data as Omit<PostItem, 'content'>[]).map((post: Omit<PostItem, 'content'>) => {
          return (
            <li key={post._id} className="mt-2">
              <div
                onClick={() => selectPost(post)}
                className={`truncate text-base px-6 py-2 rounded text-slate-700 font-medium ${
                  selectedPost._id === post._id
                    ? "bg-purple-100"
                    : "hover:bg-purple-50"
                }`}
              >
                {post.title}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
