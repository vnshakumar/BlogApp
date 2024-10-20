import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.blogs);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-blog/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Blog deleted successfully");
        getPosts();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the blog.");
    }
  };

  const updatePost = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/update-blog/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        toast.success("Blog updated successfully");
        setEditPost(false);
        getPosts();
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred while updating the blog.");
    }
  };

  const handleEditClick = (post) => {
    setEditPost(true);
    setSelectedPost(post._id);
    setTitle(post.title);
    setDescription(post.description);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="m-10">
        {posts.map((post) => (
          <div
            className="w-[40vw] mx-auto p-3 rounded-md shadow-xl"
            key={post._id}
          >
            <div className="flex justify-end text-lg gap-5 m-2">
              <MdDelete
                className="text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-all"
                onClick={() => deletePost(post._id)}
              />
              <MdOutlineEdit
                className={`${
                  selectedPost === post._id && editPost
                    ? "text-red-500"
                    : "text-gray-400"
                } hover:text-red-400 cursor-pointer hover:scale-110 transition-all`}
                onClick={() => handleEditClick(post)}
              />
            </div>
            {selectedPost === post._id && editPost ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-bold my-2 w-full px-2 py-1 border rounded"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-gray-500 font-semibold w-full px-2 py-1 border rounded"
                />
                <button
                  className="bg-purple-400 hover:bg-purple-600 px-2 py-1 my-3 rounded-md font-bold text-white"
                  onClick={() => updatePost(post._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2
                  className="text-lg font-bold my-2 selection:text-green-300 outline-none focus:bg-gray-400"
                  tabIndex={0}
                >
                  {post.title}
                </h2>
                <h3
                  className="text-gray-500 font-semibold selection:text-green-300 outline-none focus:bg-gray-400"
                  tabIndex={0}
                >
                  {post.description}
                </h3>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
