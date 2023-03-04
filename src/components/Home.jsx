import AddContact from "./AddContact";
import ContactList from "./ContactList";

const Home = () => {
  return (
    <main className="flex items-center justify-center h-screen ">
      <div className="shadow-2xl p-10  flex space-x-5  h-3/4 max-w-7xl rounded-md flex-1  ">
        <AddContact />
        <ContactList />
      </div>
    </main>
  );
};

export default Home;
