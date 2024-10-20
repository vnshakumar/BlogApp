import { Link } from "react-router-dom";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center font-bold gap-6 text-lg shadow-md py-3">
      <Link className="" to="/">Home</Link>
      {/* Vertical Divider */}
      <div className="border-l border-gray-600 h-6"></div>
      <Link to="/create">Create</Link>
    </nav>
  );
};

export default Navbar;
