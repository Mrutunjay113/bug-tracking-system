const Card = ({ title, description, assignedBy, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex-row items-center justify-between text-gray-500">
          <p>Assigned By: {assignedBy}</p>
          <p>Created At: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
