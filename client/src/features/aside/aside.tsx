"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { usePostInfoMutation } from "../../app/services/post";
import Search from "/search.svg";
import { PostItem } from "../../interface/index";
import { selectCategory, savePost, selectPost as selectedPost } from "../../app/slice/headerSlice";
import { useAppSelector, useAppDispatch } from "../../app/store";

export default function SideNav() {
  const params = useParams();
  const navitate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedCategory: any = useAppSelector(selectCategory);
  const post: any = useAppSelector(selectedPost);
  const id = searchParams.get('id') || post._id;
  const dispatch = useAppDispatch()
  const [searchWord, setSearchWord] = useState<string>('');
  const [menu, setMenu] = useState<any>([]);
  const [PostList] = usePostInfoMutation();
  useEffect(() => {
    const initData = async () => {
      let category: any = {
        _id: 0
      };
      if (selectedCategory && selectedCategory._id) {
        category = selectedCategory;
      } else {
        category = JSON.parse(sessionStorage.getItem('category') || '');
      }
      const response: any = await PostList({
        query: {
          categoryId: category?._id,
          published: 1
        },
        options: {
          _id: 1,
          title: 1,
          published: 1,
          categoryId: 1
        }
      });
      setMenu(response?.data);
      dispatch(savePost(response?.data[0]))
    }
    initData();
  }, [params.id]);

  const changeWord = (value: string) => {
    setSearchWord(value);
  }

  const filterPosts = (posts: Omit<PostItem, 'content'>[]) => {
    if (posts.length) {
      const filterPost = posts.filter((post: Omit<PostItem, 'content'>) => post.title.includes(searchWord))
      return filterPost
    }
    return []
  }

  const selectPost = (post: Omit<PostItem, 'content'>) => {
    const pathname = location.pathname.length > 1?location.pathname:'JavaScript';
    navitate(`${pathname}?id=${post._id}`);
  };

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
        {filterPosts(menu as Omit<PostItem, 'content'>[]).map((post: Omit<PostItem, 'content'>) => {
          return (
            <li key={post._id} className="mt-2">
              <div
                onClick={() => selectPost(post)}
                className={`truncate text-base px-6 py-2 rounded text-slate-700 font-medium ${
                  id === post._id
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
