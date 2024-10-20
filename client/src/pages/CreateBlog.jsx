import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const CreateBlog = () => {
  const navigate = useNavigate();
  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    const blog = {
      title,
      description,
    };
    const response = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (response.status == 200) {
      toast.success("Blog Posted Successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(()=>navigate("/"), 2000);
    } else {
      toast.error("Failed to Post Blog");

      // if (response.status == 200) {
      //   alert("Blog Posted Successfully");
      //   window.location.reload();

      // } else {
      //   alert("Failed to Post Blog");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[60vw] mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center">Create Blog</h1>
        <form className="flex flex-col gap-3" onSubmit={postData}>
          <label htmlFor="title" className="font-semibold text-lg">
            Title :{" "}
          </label>
          <input
            type="text"
            id=""
            name="title"
            placeholder="Enter the blog title"
            className="px-3 py-2 rounded-md outline-none border-2 border-gray-300"
          />
          <label htmlFor="description" className="font-semibold text-lg">
            Description :{" "}
          </label>
          <textarea
            id=""
            name="description"
            placeholder="Enter the blog description"
            className="px-3 py-2 rounded-md outline-none border-2 border-gray-300 h-[300px]"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-300 hover:bg-blue-400 text-white font-semibold"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
