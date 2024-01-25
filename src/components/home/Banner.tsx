import React from 'react'
import Search from './BannerSearch'

const Banner = () => {
  return (
    <>
    <main className="">
        <div className="background h-[65vh]">
            <div className="h-[100%] bg flex justify-center items-center p-4 flex-col">
                <h1 className="font-semibold leading-wide text-[2.4rem] capitalize text-white text-center">Journey To your perfect home</h1>
                <p className="mt-2 text-md font-semibold text-white leading-wide text-center px-5 md:px-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae id dicta quae ad consectetur culpa aliquid odit? Architecto, impedit optio?</p>

                <div className="mt-8 w-[85vw] md:w-[50vw]">
                    <Search/>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Banner