import { useState, useEffect, useRef } from "react"
import 'react-toastify/dist/ReactToastify.css'
import { getContacts, saveContact, updateContact, updatePhoto } from "./api/ContactService";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ContactDetail from "./components/ContactDetail";
import { toastError } from "./api/ToastService";
import { ToastContainer } from "react-toastify";

function App() {
  const fileInputRef = useRef();
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
  });

  const getAllContacts = async (page = 0, size = 3) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message)
    }
  }

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
    } catch (error) {
      console.log(error);
      toastError(error.message)
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message)
    }
  }; 

  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close();

  const onChange = (ev) => {
    setValues({...values, [ev.target.name] : ev.target.value})
  }

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  }
  
  const handleNewContact = async (ev) => {
    ev.preventDefault()
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const { data : photoUrl } = await updatePhoto(formData);

      toggleModal(false);
      setFile(null);
      setValues({
        name: "",
        email: "",
        title: "",
        phone: "",
        address: "",
        status: "",
      });
      fileInputRef.current.value = null;
      getAllContacts();
    } catch(error) {
      console.log(error);
      toastError(error.message)
    }
  }

  useEffect(() => {
    getAllContacts();
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center">
        <Header toggleModal={toggleModal} numberOfContacts={data.totalElements} />
        <div className="flex justify-center mt-3">
          <Routes>
            <Route path="/" element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts}/>} />
            <Route path="/contacts/:id" element={<ContactDetail updateContact={updateContact} updateImage={updateImage}  />} />
          </Routes>
        </div>
      </div>

      {/* Modal */ }
      <dialog ref={modalRef} className="rounded-lg p-5 w-1/2" id="modal">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">New Contact</div>
          <div onClick={() => toggleModal(false)}><FontAwesomeIcon className="text-red-500 hover:text-red-700 cursor-pointer" size="xl" icon={faCircleXmark} /></div>
        </div>
        <div className="">
          <form onSubmit={handleNewContact}>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Name</span>
                <input type="text"  name='name' value={values.name} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Email</span>
                <input type="text"  name='email' value={values.email} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Title</span>
                <input type="text"  name='title' value={values.title} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Phone Number</span>
                <input type="text"  name='phone' value={values.phone} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Address</span>
                <input type="text"  name='address' value={values.address} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-xl">Account Status</span>
                <input type="text"  name='status' value={values.status} onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
              </div>
            </div>
            <div className="flex flex-col w-full mt-3">
                <span className="text-gray-600 text-xl">Profile Photo</span>
                <div>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Choose File
                  </button>
                  {file && <span className="ml-2">{file.name}</span>}
                </div>
                
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => toggleModal(false)} type='button' className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg py-2 px-4 w-1/5 cursor-pointer">Cancel</button>
              <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg py-2 px-4 w-1/5 cursor-pointer">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer/>
    </>
  )
}

export default App
