import { useParams, useNavigate } from "react-router-dom";
import viteLogo from "/logo.svg";
import { CategoryItem } from "../../interface";
import { useLayoutEffect } from "react";
import { saveCategory } from '../../app/slice/headerSlice';
import { useAppDispatch } from "../../app/store";

export function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const param = params.id || "JavaScript";
  const dom = document.getElementById('categories') as HTMLInputElement;
  const categories = JSON.parse(dom.value).sort((a: any,b: any) => a.order - b.order);
  const dispatch = useAppDispatch()
  
  useLayoutEffect(() => {
    sessionStorage.setItem('category', JSON.stringify(categories.find((c: any) => c.name === param)));
  }, [])

  const onCategory = (category: Partial<CategoryItem>) => {
    dispatch(saveCategory(category));
    navigate(`/${category.name}`)
  }
  return (
    <>
      <div className="z-[101] lg:border-b bg-white sticky top-0">
        <header className="sticky top-0 flex m-auto bg-white max-w-screen-2xl lg:px-8">
          <div className="flex items-center w-[19rem] py-4">
            <img
              src={viteLogo}
              alt="Logo"
              className="w-7 h-7 text-gradient-to-r from-purple-500 to-pink-500"
              width={28}
              height={28}
            />
            <a href="/" className="pl-2 text-xl font-bold text-slate-900">
              星辰大海
            </a>
          </div>
          <div className="flex items-center">
            <nav className="h-full text-base font-medium leading-6 text-slate-700">
              <ul className="flex items-center h-full space-x-8">
                {
                  categories.map((category: Partial<CategoryItem>) => {
                    return (
                      <li
                        key={category._id}
                        onClick={() => onCategory(category)}
                        className={`inline-flex items-center h-full border-b-2 cursor-pointer hover:text-purple-700 ${
                          param === category.name
                            ? "border-purple-700 text-purple-700"
                            : "hover:border-purple-700 border-b-white"
                        }`}
                      >
                        {category.alias}
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
