import React from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

const BlogHighlights: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6df54d197fcb93eba7de2f3bec60bd7d62d5c6df?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      link: "#",
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/32455780da50348952934e255ef56b99a6abf598?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      link: "#",
    },
    {
      id: 3,
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/773964830d4922e124cd00b93afc92626bc1a944?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      link: "#",
    },
    {
      id: 4,
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/eb83e093cf09f45a48cbce15f61c6acb114e3b02?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      link: "#",
    },
    {
      id: 5,
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6a3eae6fe5fa62d85a4ca98956ab3569d1d92b2e?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      link: "#",
    },
  ];

  return (
    <section
      id="blogs"
      className="w-full max-w-[1335px] flex flex-col items-center mt-[153px] max-md:max-w-full max-md:mt-10"
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Blogs
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-[62px] w-[668px] mt-[27px] max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]">
        Spend Less Time Managing and More Time Growing
      </h2>
      <button className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[71px] px-[33px] py-[19px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid max-md:mt-10 max-md:px-5 hover:bg-[rgba(245,246,251,0.8)] transition-colors">
        View all Blogs
      </button>

      <div className="self-stretch flex flex-col items-center text-base font-medium mt-[47px] max-md:max-w-full max-md:mt-10">
        <div className="flex gap-[40px_60px] max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col w-[254px]">
              <div className="max-w-full w-[254px] text-[#2D3748] leading-[25px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-[1.25] object-contain w-full rounded-[10px]"
                />
                <h3 className="w-full mt-5 rounded-[0px_0px_0px_0px] max-md:pr-5">
                  {post.title}
                </h3>
              </div>
              <a
                href={post.link}
                className="flex items-center gap-[15px] text-[#E98A23] leading-loose mt-5 hover:text-[rgba(233,138,35,0.8)] transition-colors"
              >
                <span className="self-stretch my-auto">Read More</span>
                <ArrowRightIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
