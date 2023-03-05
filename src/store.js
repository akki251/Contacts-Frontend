import { create } from "zustand";

export const useContactStore = create((set) => ({
  contacts: [],
  updateContactValue: {
    name: "",
    contact_number: "",
    isUpdating: false,
  },
  setUpdateContact: (name, contact_number, isUpdating, id) =>
    set((state) => {
      return {
        ...state,
        updateContactValue: {
          name,
          contact_number,
          isUpdating,
          id,
        },
      };
    }),
  loggedInProfile: null || JSON.parse(localStorage.getItem("profile")),
  logout: () =>
    set((state) => {
      localStorage.removeItem("profile");
      return {
        loggedInProfile: null,
      };
    }),
  setAuth: (profile) => set((state) => ({ loggedInProfile: profile })),
  setContacts: (contacts) => set((state) => ({ contacts })),
  addContact: (contact) =>
    set((state) => {
      return {
        contacts: [contact, ...state.contacts],
      };
    }),

  deleteContact: (id) =>
    set((state) => {
      const filteredContacts = state.contacts.filter(
        (contact) => contact._id !== id
      );

      return {
        contacts: filteredContacts,
      };
    }),

  updateContact: (id, name, contact_number) =>
    set((state) => {
      const oldContacts = [...state.contacts];
      const tobeUpdateContactIndex = oldContacts.findIndex(
        (contact) => contact._id === id
      );

      oldContacts[tobeUpdateContactIndex] = {
        ...oldContacts[tobeUpdateContactIndex],
        name,
        contact_number,
      };

      return {
        contacts: oldContacts,
      };
    }),
}));
