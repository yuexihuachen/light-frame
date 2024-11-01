import { useParams, useNavigate } from "react-router-dom";
import { useGetCategoryInfoQuery } from "../../app/services/category";
import viteLogo from "/logo.svg";
import { CategoryItem } from "../../interface";
import { deepClone } from "../../utils/utils";
import { useEffect } from "react";

export function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const param = params.id || "JavaScript";
  const { data, isLoading } = useGetCategoryInfoQuery();
  let menus: Partial<CategoryItem>[] = []
  if (!isLoading) {
    menus = deepClone(data!.data).sort((a: CategoryItem, b: CategoryItem) => a.order - b.order) as CategoryItem[];
  }
  useEffect(() => {
    const sessionCategory = sessionStorage.getItem('category')
    if (!isLoading && !sessionCategory) {
      sessionStorage.setItem('category', JSON.stringify(data?.data[0]))
    }
  }, [isLoading])

  const onCategory = (category: Partial<CategoryItem>) => {
    sessionStorage.setItem('category', JSON.stringify(category))
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
                {!isLoading &&
                  menus.map((category) => {
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

          {isLoading && (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => {
                return (
                  <div
                    key={index}
                    className="w-16 h-8 mx-3 my-auto text-center rounded bg-slate-50 text-slate-500"
                  ></div>
                );
              })}
            </>
          )}
        </header>
      </div>
    </>
  );
}
