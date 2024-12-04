import { FaSearch } from 'react-icons/fa';

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <FaSearch className="text-gray-400 text-4xl" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      No Data Found!
      </h2>
      
      <p className="text-gray-500 text-center max-w-md">
        We can not find any data matching your criteria.
      </p>
    </div>
  )
}

export default NoDataFound;
