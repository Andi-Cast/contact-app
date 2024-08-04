export default function Header({toggleModal, numberOfContacts}) {
    return(
        <header className="w-full px-5">
            <div className="flex justify-between items-center my-5">
                <h3 className="text-xl font-bold">Contact List ({numberOfContacts})</h3>
                <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => toggleModal(true)}>
                    Add New Contact
                </button>
            </div>
        </header>
    );
}
