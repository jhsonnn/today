
const Header = () => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-center ">
      <ul className="list-none py-4 text-xl font-medium flex justify-between w-96">
        <li className="text-gray-900 hover:text-todayPink cursor-pointer">HOME</li>
        <li className="text-gray-900 hover:text-todayPink cursor-pointer">DIARY</li>
        <li className="text-gray-900 hover:text-todayPink cursor-pointer">MY PAGE</li>
      </ul>

    </div>
  );
};

export default Header;
