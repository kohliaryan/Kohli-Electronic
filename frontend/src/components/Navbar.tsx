import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-blue-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl">
            <span className="text-white">Kohli</span>{" "}
            <span className="text-yellow-500">Electronics</span>
          </h1>
        </Link>

        <button onClick={toggleDropdown} className="lg:hidden">
          {isOpen ? (
            <svg
              fill="none"
              className="w-5 h-5 text-white"
              viewBox="0 0 15 15"
              height="em"
              width="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.854 2.854a.5.5 0 00-.708-.708L7.5 6.793 2.854 2.146a.5.5 0 10-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 00.708.708L7.5 8.207l4.646 4.647a.5.5 0 00.708-.708L8.207 7.5l4.647-4.646z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          )}
        </button>
        <ul className="hidden lg:block lg:flex gap-4 text-white">
          <li>
            <Link to={"/"} className="hover:text-yellow-500">Home</Link>
          </li>
          <li>
            <Link to={"/products"} className="hover:text-yellow-500">Products</Link>
          </li>
          <li>
            <Link to={"/offers"} className="hover:text-yellow-500">Offers</Link>
          </li>
          <li>
            <Link to={"/services"} className="hover:text-yellow-500">Services</Link>
          </li>
          <li>
            <Link to={"/contact"} className="hover:text-yellow-500">Contact Us</Link>
          </li>
          <li>
            <Link to={"/login"} className="hover:text-yellow-500">Admin</Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <ul className="text-center p-2 text-white bg-blue-900 lg:hidden">
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/"} className="block p-2 hover:text-yellow-500">Home</Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/products"} className="block p-2 hover:text-yellow-500">Products</Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/offers"} className="block p-2 hover:text-yellow-500">Offers</Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/services"} className="block p-2 hover:text-yellow-500">Services</Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/contact"} className="block p-2 hover:text-yellow-500">Contact Us</Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} to={"/login"} className="block p-2 hover:text-yellow-500">Admin</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
