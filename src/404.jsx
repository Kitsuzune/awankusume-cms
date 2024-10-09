import { ArrowDownOutlined } from '@ant-design/icons'
import React from 'react'

const NotFound = () => {
    return (
        <div className="mt-5 p-10 bg-white border rounded-lg">
            <main class="h-max w-full flex flex-col justify-center items-center bg-transparent">
                <h1 class="text-9xl font-extrabold text-main tracking-widest">404</h1>
                <div class="bg-main px-2 text-sm text-white p-2 rounded">
                    Page Not Found
                </div>
                <div className="text-black pt-5 text-center">
                    Unfortunatly, Either the page you are looking for does not exist or you are not authorized to access it or this page is still in development.
                    <br />
                    <br />
                    <ArrowDownOutlined className="text-4xl" />
                </div>
                <button class="mt-5">
                    <a
                        class="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring"
                        onClick={() => window.history.back()}
                    >
                        <span
                            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-main group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            {/* <router-link to="/">Go Home</router-link> */}
                            Go Back 1 Page Earlier
                        </span>
                    </a>
                </button>
            </main>
        </div>
    )
}

export default NotFound