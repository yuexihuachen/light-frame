'use client';

import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import { useSearchParams } from 'react-router-dom';
import { usePostInfoMutation } from "../../app/services/post";

export default function Content() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const markdownRef = useRef<HTMLDivElement>(null);
  const [PostList] = usePostInfoMutation();
  
  useEffect(() => {
    async function fetchPosts() {
      const response: any = await PostList({
        query: {
          _id: id
        },
        options: {
          _id: 1,
          title: 1,
          categoryId: 1,
          published: 1,
          content: 1,
        },
      });
      
      if (markdownRef.current && response?.data.length) {
        markdownRef.current.innerHTML = marked.parse(
          decodeURIComponent(response?.data[0].content || '')
        ) as string;
      }
    }
    fetchPosts();
  }, [id]);



  return (
    <section>
      <div
        className={`
      prose
      prose-slate
      prose-h2:mt-0
      prose-h3:mt-0
      prose-h4:mt-0
      max-w-full
      prose-code:rounded-md
      prose-code:before:content-none 
      prose-code:after:content-none
      prose-p:before:content-none 
      prose-p:after:content-none
      prose-hr:my-4
      `}
        ref={markdownRef}
      ></div>
    </section>
  );
}
