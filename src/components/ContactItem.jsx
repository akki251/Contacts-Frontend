import { BsPersonBadge, BsTelephoneOutboundFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useContactStore } from "../store";
import { toast } from "react-hot-toast";
import { deleteContactBackend } from "./../api/contacts";
import { catchError } from "../utils/catchError";
import React from "react";
const ContactItem = ({ name, contact_number, id }) => {
  const deleteContact = useContactStore((state) => state.deleteContact);
  const setUpdateContact = useContactStore((state) => state.setUpdateContact);
  const logout = useContactStore((state) => state.logout);

  const onUpdateHandler = () => {
    setUpdateContact(name, contact_number, true, id);
  };

  const onDeleteHandler = async () => {
    deleteContact(id);

    const { errorMessage } = await catchError(() => {
      return deleteContactBackend(id);
    });

    if (errorMessage) {
      logout();
      return toast.error(errorMessage);
    } else {
      toast.success("Contact deleted");
    }
  };

  return (
    <section className="flex justify-between bg-gray-300 shadow-lg drop-shadow-md items-center rounded-md p-3">
      <div className="contact-details flex-col space-y-2">
        <div className="flex space-x-3 items-center">
          <div>
            <BsPersonBadge size={20} color="blue" />
          </div>

          <p>{name}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <div>
            <BsTelephoneOutboundFill size={20} color="blue" />
          </div>

          <p>{contact_number}</p>
        </div>
      </div>

      <div className="contact-actions flex space-x-5">
        <FiEdit size={20} color="blue" onClick={onUpdateHandler} />
        <MdDeleteOutline size={20} color="red" onClick={onDeleteHandler} />
      </div>
    </section>
  );
};

export default React.memo(ContactItem);
