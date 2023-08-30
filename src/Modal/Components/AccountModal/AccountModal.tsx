import { RefObject, useEffect, useRef } from "react";
import "./AccountModal.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../../Contexts/AuthContext";
import { useSnackbar } from "../../../Contexts/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../../Store/ProductStore";

interface AccountModalProps {
  onClose: () => void;
  navRef: RefObject<HTMLDivElement>;
  // currentUser: any;
}

const AccountModal: React.FC<AccountModalProps> = ({ onClose, navRef }) => {
  // variables
  const accountModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const firstName = useProductStore((state) => state.firstName);
  const lastName = useProductStore((state) => state.lastName);

  // hooks
  const { currentUser, logout } = useAuth();

  // snackbar
  const snackbar = useSnackbar();

  // functions
  const handleClickOutside = (event: MouseEvent) => {
    if (
      accountModalRef.current &&
      navRef.current &&
      !accountModalRef.current.contains(event.target as Node) &&
      !navRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleClickLogoutButton = async () => {
    await logout();
    navigate("/login");
    snackbar.success("logged out");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log(currentUser, "currentUser");
  return (
    <>
      <div className="account-modal" ref={accountModalRef}>
        <div className="account-modal__wrapper">
          <div className="account-modal__wrapper--profile">
            <div className="account-modal__wrapper--profile-text">
              <p>Profile</p>
            </div>
            <div className="account-modal__wrapper--profile-name">
              <FaRegUserCircle className="account-modal__wrapper--profile-icon" />
              <p>{firstName} {lastName}</p>
            </div>
          </div>
          <div className="account-modal__wrapper-email">
            <p>{currentUser.email}</p>
          </div>
          <div className="account-modal__wrapper--logout-button">
            <button onClick={() => handleClickLogoutButton()}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountModal;
