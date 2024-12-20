import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview"); // Mục đang được chọn

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Cập nhật mục được chọn khi click
  };

  return (
    <header className="flex items-center justify-between p-2 bg-gray-700 text-white">
      {" "}
      {/* Thay đổi từ bg-gray-900 sang bg-gray-700 */}
      {/* Logo và Navigation */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <img src="/logokilan.jpg" alt="Logo" className="logo" />

        {/* Navigation */}
        <nav className="flex space-x-4">
          <a
            href="#overview"
            onClick={() => handleTabClick("overview")}
            className={`text-sm px-3 py-2 rounded-lg ${
              activeTab === "overview" ? "bg-gray-600" : "hover:bg-gray-700" // Thay đổi từ bg-gray-700 sang bg-gray-600 và hover-bg-gray-800 sang hover:bg-gray-700
            }`}
          >
            Overview
          </a>
          <a
            href="#pools"
            onClick={() => handleTabClick("pools")}
            className={`text-sm px-3 py-2 rounded-lg ${
              activeTab === "pools" ? "bg-gray-600" : "hover:bg-gray-700" // Tương tự như trên
            }`}
          >
            Pools
          </a>
          <a
            href="#tokens"
            onClick={() => handleTabClick("tokens")}
            className={`text-sm px-3 py-2 rounded-lg ${
              activeTab === "tokens" ? "bg-gray-600" : "hover:bg-gray-700" // Tương tự như trên
            }`}
          >
            Tokens
          </a>
        </nav>
      </div>
      {/* Dropdown, Search và Button */}
      <div className="flex items-center space-x-3 ml-auto h-8">
        {/* Dropdown (Selection coin type) */}
        <select className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg focus:outline-none text-sm h-full">
          {" "}
          {/* Thay đổi từ bg-gray-800 sang bg-gray-700 */}
          <option value="eth">Ethereum</option>
          <option value="btc">Bitcoin</option>
          <option value="bnb">Binance Coin</option>
        </select>

        {/* Search Bar */}
        <form className="flex items-center flex-grow">
          <input
            type="text"
            placeholder="Search pools or tokens"
            className="bg-gray-700 text-gray-300 placeholder-gray-500 px-3 py-1 rounded-lg focus:outline-none h-full text-sm w-full"
          />
        </form>

        {/* Button */}
        <button className="text-xl hover:text-gray-400">⋯</button>
      </div>
    </header>
  );
};

export default Header;
