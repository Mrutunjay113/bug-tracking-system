const Sidebar = () => {
  return (
    <aside className="bg-gray-200 h-screen w-64 p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        <li className="py-2">
          <a href="#" className="text-gray-800 hover:text-blue-500">
            All Issues
          </a>
        </li>
        <li className="py-2">
          <a href="#" className="text-gray-800 hover:text-blue-500">
            Open Issues
          </a>
        </li>
        <li className="py-2">
          <a href="#" className="text-gray-800 hover:text-blue-500">
            Closed Issues
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
