import { useState } from "react";
import {
    Link
} from "react-router-dom";
import Logo from "/react.svg";

export function Header() {
    // const location = useLocation();
    // const [,name] = location.pathname !== '/'? location.pathname.split('/'): ['', '/'];
    // const [products] = useState([
    //     {
    //         url:'/',
    //         name: '/',
    //         title: 'Dashboard'
    //     },
    //     {
    //         url:'/post',
    //         name: 'post',
    //         title: '笔记'
    //     },
    //     {
    //         url:'/category',
    //         name: 'category',
    //         title: '类型'
    //     },
    //     {
    //         url:'/search',
    //         name: 'search',
    //         title: '搜索'
    //     },
    //     {
    //         url:'/login',
    //         name: 'login',
    //         title: '登录'
    //     }
    // ])
    const products: any[] = useState([])
    return <>
        <div className="sticky top-0 z-50 min-h-full bg-white border-b">
            <nav className="bg-white-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8" src={`/static${Logo}`} alt="Your Company" />
                            </div>
                            <div className="block">
                                <div className="flex items-baseline ml-10 space-x-4">
                                    {
                                        products.map((item, index) => {
                                            return  <Link to={item.url} key={index} className={`px-3 py-4 text-sm font-medium text-gray-900 border-b-2 ${name === item.name? 'border-indigo-500': 'border-white'}`}>{item.title}</Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center ml-4 md:ml-6">
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
}
