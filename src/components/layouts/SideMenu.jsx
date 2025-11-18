import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import Modal from "../../components/Modal";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  // Profile modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  const resetProfileState = () => {
    setSelectedImage(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setImageLoading(false);
    setPasswordLoading(false);
  };

  const handleOpenProfileModal = () => {
    resetProfileState();
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    resetProfileState();
  };

  // 上传新头像
  const handleUpdateAvatar = async () => {
    if (!selectedImage) {
      toast.error("Please choose an image file.");
      return;
    }

    try {
      setImageLoading(true);

      const uploadRes = await uploadImage(selectedImage);
      const imageUrl = uploadRes?.imageUrl || "";

      if (!imageUrl) {
        toast.error("Image upload failed.");
        return;
      }

      const res = await axiosInstance.put("/api/auth/profile", {
        profileImageUrl: imageUrl,
      });

      if (res?.data) {
        updateUser(res.data);
      }

      toast.success("Profile picture updated.");
      handleCloseProfileModal();
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile picture."
      );
    } finally {
      setImageLoading(false);
    }
  };

  // 修改密码
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);

      await axiosInstance.put("/api/auth/change-password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully.");
      handleCloseProfileModal();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error?.response?.data?.message || "Failed to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <>
      {/* 左侧侧边栏 */}
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
        {/* 用户信息 */}
        <div className="flex flex-col items-center justify-center mb-7 pt-5">
          <button
            type="button"
            className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleOpenProfileModal}
          >
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile"
              className="w-20 h-20 bg-slate-400 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            />
          </button>

          {user?.role === "admin" && (
            <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1 uppercase tracking-wide">
              Admin
            </div>
          )}

          <h5 className="text-gray-950 font-medium leading-6 mt-3">
            {user?.name || ""}
          </h5>

          <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
        </div>

        {/* 菜单 */}
        <nav className="px-2">
          {sideMenuData.map((item, index) => (
            <button
              key={`menu_${index}`}
              type="button"
              className={`w-full flex items-center gap-3 text-[15px] rounded-md ${
                activeMenu === item.label
                  ? "text-primary bg-blue-50 border border-blue-100"
                  : "text-slate-700 hover:bg-slate-50"
              } py-2.5 px-4 mb-1.5 transition`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-xl" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Settings Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        title="Profile Settings"
      >
        {/* 让内容在各种屏幕下都居中 & 可滚动 */}
        <div className="w-full max-w-md md:max-w-lg max-h-[75vh] overflow-y-auto px-1">
          <div className="space-y-6">

            {/* 区块 1：头像 + 上传 */}
            <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user?.profileImageUrl || ""}
                  alt="Current Avatar"
                  className="w-14 h-14 rounded-full object-cover bg-slate-300"
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    Update Profile Picture
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    JPG / PNG, smaller than 2MB is recommended.
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="block w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary file:text-white file:text-xs hover:file:bg-blue-600 cursor-pointer"
                />
              </div>

              <button
                type="button"
                className="w-full bg-primary text-white text-sm font-medium py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleUpdateAvatar}
                disabled={imageLoading}
              >
                {imageLoading ? "UPDATING..." : "UPDATE AVATAR"}
              </button>
            </section>

            {/* 区块 2：修改密码 */}
            <section className="rounded-xl border border-slate-200 bg-white px-4 py-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                Change Password
              </h4>
              <p className="text-[11px] text-slate-500 mb-4">
                For your account security, please use a strong and unique password.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-5 bg-primary text-white text-sm font-medium py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleChangePassword}
                disabled={passwordLoading}
              >
                {passwordLoading ? "UPDATING..." : "UPDATE PASSWORD"}
              </button>
            </section>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SideMenu;
