import { Button, Input, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { addContactToBackend, updateContactBackend } from "../api/contacts";
import { catchError } from "../utils/catchError";
import { isValid } from "../utils/validate";
import { useContactStore } from "./../store";

const AddContact = () => {
  const addContact = useContactStore((state) => state.addContact);
  const updateContact = useContactStore((state) => state.updateContact);
  const setUpdateContact = useContactStore((state) => state.setUpdateContact);

  const [isLoading, setIsLoading] = useState(false);

  const logout = useContactStore((state) => state.logout);
  const updateContactValue = useContactStore(
    (state) => state.updateContactValue
  );

  const logoutHandler = () => {
    logout();
  };

  const { isUpdating } = updateContactValue;

  const [contactDataInput, setContactDataInput] = useState({
    name: {
      value: "",
      invalidText: "",
    },
    contact_number: {
      value: "",
      invalidText: "",
    },
  });

  useEffect(() => {
    setContactDataInput({
      name: {
        value: updateContactValue.name,
        invalidText: "",
      },
      contact_number: {
        value: updateContactValue.contact_number,
        invalidText: "",
      },
    });
  }, [updateContactValue.isUpdating]);

  const name = contactDataInput?.name?.value;
  const contact_number = contactDataInput?.contact_number?.value;

  const onSubmitHandler = async () => {
    setIsLoading(true);
    await executeSubmit();
    setIsLoading(false);
  };

  const executeSubmit = async () => {
    const contact_data = {
      name,
      contact_number,
    };

    if (!name || !contact_number) {
      return toast.error("No empty input allowed!");
    }

    if (isUpdating) {
      let { errorMessage } = await catchError(() => {
        return updateContactBackend(updateContactValue.id, contact_data);
      });

      if (errorMessage) {
        logout();
        return toast.error(errorMessage);
      } else {
        toast.success("Contact Updated");
      }

      updateContact(updateContactValue.id, name, contact_number);
      setUpdateContact("", "", false, "");
      return;
    }

    let { data, errorMessage } = await catchError(() => {
      return addContactToBackend(contact_data);
    });

    if (errorMessage) {
      logout();
      return toast.error(errorMessage);
    } else {
      toast.success("New Contact created !");
    }

    const id = data.data._id;

    addContact({
      ...contact_data,
      _id: id,
    });
    setContactDataInput((prevContactInput) => {
      const resetInput = {
        name: {
          value: "",
        },
        contact_number: {
          value: "",
        },
      };

      return resetInput;
    });
  };

  const handleInputChange = (identifier, event) => {
    const inputValue = event.target.value;
    setContactDataInput((prevContactInput) => {
      return {
        ...prevContactInput,
        [identifier]: {
          value: inputValue,
          invalidText: isValid(inputValue, identifier),
        },
      };
    });
  };

  return (
    <div className="basis-1/4 flex-col flex justify-between ">
      <div className="contact-form  text-center flex-col space-y-10">
        <h3> {`${isUpdating ? "Update" : "Add new"}  contact`}</h3>
        <Input
          fullWidth
          clearable
          bordered
          maxLength={20}
          type="text"
          helperColor="error"
          value={contactDataInput.name.value || ""}
          helperText={contactDataInput.name.invalidText}
          labelPlaceholder="Name"
          onChange={handleInputChange.bind(this, "name")}
        />
        <Input
          fullWidth
          clearable
          bordered
          maxLength={10}
          aria-label="contact-number"
          type="number"
          value={contactDataInput.contact_number.value || ""}
          placeholder="8580943XX"
          helperColor="error"
          helperText={contactDataInput.contact_number.invalidText}
          onChange={handleInputChange.bind(this, "contact_number")}
        />
        <Button
          disabled={
            contactDataInput.name.invalidText ||
            contactDataInput.contact_number.invalidText ||
            isLoading
          }
          onPress={onSubmitHandler}
          size="md"
          css={{
            margin: "auto",
          }}
        >
          {isLoading ? <Loading size="sm" /> : isUpdating ? "Update" : "Save"}
        </Button>
      </div>
      <Button color="error" bordered onPress={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export default React.memo(AddContact);
