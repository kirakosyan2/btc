import { useState } from "react";

export type PopupControls = {
  isOpened: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
};

export const usePopupControls = (value = false): PopupControls => {
  const [opened, setOpened] = useState<boolean>(value)

  const closePopup = () => setOpened(false)
  const openPopup = () => setOpened(true)
  const togglePopup = () => setOpened((prev) => !prev)

  return {
    isOpened: opened,
    closePopup, 
    openPopup,
    togglePopup
  }
}