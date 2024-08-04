import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getContact, updatePhoto } from "../api/ContactService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toastSuccess } from "../api/ToastService";

export default function ContactDetail({ updateContact, updateImage }) {
    const inputRef = useRef();

    const [contact, setContact] = useState({
        id: "",
        name: "",
        email: "",
        title: "",
        phone: "",
        address: "",
        status: "",
        photoUrl: ""
    });

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setContact(data);
        } catch (error) {
            console.log(error);
            toastError(error.message)
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("id", id);
            await updateImage(formData);
            setContact((prev) => ({
                ...prev,
                photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`
            }));
            toastSuccess("Photo updated");
        } catch (error) {
            console.log(error);
            toastError(error.message)
        }
    };

    const onChange = (ev) => {
        setContact({...contact, [ev.target.name] : ev.target.value})
    }

    const onUpdateContact = async (ev) => {
        event.preventDefault()
        await updateContact(contact);
        fetchContact(id);
        toastSuccess("Contact updated.")
    };

    useEffect(() => {
        fetchContact(id);
    }, [id]);

    return (
        <div className="flex flex-col px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-start">
                <Link to="/contacts" className="flex gap-3 items-center mb-4">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to list
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col w-full md:w-1/3 bg-gray-200 p-3 gap-3 rounded-md items-center">
                    <img
                        className="w-full md:w-auto h-auto max-w-xs max-h-48 rounded-md object-cover"
                        src={contact.photoUrl}
                        alt={`Profile image of ${contact.name}`}
                    />
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-lg flex justify-center">{contact.name}</p>
                        <p className="text-md flex justify-center text-gray-400">JPG, GIF, or PNG. Max size of 10MB.</p>
                        <button onClick={selectImage} className="flex bg-blue-500 hover:bg-blue-700 text-white gap-3 justify-center items-center p-2 rounded-lg">
                            <div className="text-sm">Change Photo</div>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-grow bg-gray-200 p-3 rounded-md">
                    <form onSubmit={onUpdateContact} className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                        <input type="hidden" defaultValue={contact.id} name="id" required />
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Name</span>
                            <input type="text" value={contact.name} name="name" onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Email</span>
                            <input type="text" value={contact.email} name="email" onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Phone</span>
                            <input type="text" value={contact.phone} name="phone" onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Address</span>
                            <input type="text" value={contact.address} name="address"onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Title</span>
                            <input type="text" value={contact.title} name="title" onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-xl">Status</span>
                            <input type="text" value={contact.status} name="status" onChange={onChange} className="px-2 border-2 border-gray-400 rounded-md h-10" required />
                        </div>
                        <div className="flex w-full justify-start my-3">
                            <button type="submit" className="flex bg-blue-500 hover:bg-blue-700 rounded-lg cursor-pointer px-3 py-1 text-white justify-center items-center">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <form className="hidden">
                <input type="file" ref={inputRef} onChange={(ev) => updatePhoto(ev.target.files[0])} name="file" accept="image/*" />
            </form>
        </div>
    );
}
