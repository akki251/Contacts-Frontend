import ContactItem from "./ContactItem";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect, useState } from "react";
import { useContactStore } from "./../store";
import { getAllContacts } from "../api/contacts";
import { Loading } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { catchError } from "../utils/catchError";
const ContactList = () => {
  const contacts = useContactStore((state) => state.contacts);
  const logout = useContactStore((state) => state.logout);
  const setContacts = useContactStore((state) => state.setContacts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      let { data, errorMessage } = await catchError(() => {
        return getAllContacts();
      });

      if (errorMessage) {
        logout();
        return toast.error(errorMessage);
      }

      const contacts = data.data.contacts.reverse();

      setContacts(contacts);
      setIsLoading(false);
    };

    fetchContacts();
  }, [logout, setContacts]);

  const NoContent = () => {
    return (
      <h4 className="text-md text-center text-blue-500">
        No contacts! Try adding some
      </h4>
    );
  };

  const Loader = () => {
    return (
      <div className=" flex-1  flex   items-center justify-center">
        <Loading type="default" size="xl" />
      </div>
    );
  };

  return (
    <div className="bg-gray-100 flex-1 flex flex-col px-3 space-y-8 ">
      <h3>Your Contacts</h3>
      {!isLoading && contacts?.length === 0 && <NoContent />}
      {isLoading && <Loader />}
      {!isLoading && contacts.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height - 50}
              itemSize={120}
              itemCount={contacts.length}
              itemData={contacts}
              width={width}
            >
              {({ data, index, style }) => {
                return (
                  <div style={style}>
                    <ContactItem
                      key={data[index]._id}
                      name={data[index].name}
                      id={data[index]._id}
                      contact_number={data[index].contact_number}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default ContactList;
