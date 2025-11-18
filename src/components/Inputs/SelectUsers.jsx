import { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers = [], setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (Array.isArray(response.data)) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setTempSelectedUsers(selectedUsers || []);
    setIsModalOpen(true);
  };

  const selectedUserAvatars =
    allUsers
      ?.filter((user) => (selectedUsers || []).includes(user._id))
      .map((user) => user.profileImageUrl) || [];

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setTempSelectedUsers(selectedUsers || []);
    }
  }, [isModalOpen, selectedUsers]);

  return (
    <div className="mt-2 space-y-3 sm:space-y-4">
      {selectedUserAvatars.length === 0 ? (
        <button
          type="button"
          className="card-btn flex items-center gap-2 text-sm sm:text-[15px]"
          onClick={handleOpenModal}
        >
          <LuUsers className="text-base" />
          <span>Add Members</span>
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleOpenModal}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="max-h-[70vh] sm:max-h-[60vh] overflow-y-auto -mx-4 sm:mx-0 px-4 sm:px-0 space-y-1">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-gray-800 dark:text-white text-sm sm:text-[15px]">
                  {user.name}
                </p>
                <p className="truncate text-xs sm:text-[13px] text-gray-500">
                  {user.email}
                </p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary flex-shrink-0"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4 sm:justify-end">
          <button
            type="button"
            className="card-btn w-full sm:w-auto"
            onClick={() => setIsModalOpen(false)}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="card-btn-fill w-full sm:w-auto"
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
