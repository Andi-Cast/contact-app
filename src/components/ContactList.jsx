import Contact from "./Contact";

export default function ContactList({ data, currentPage, getAllContacts }) {
    return (
        <div>
            {data?.content?.length === 0 && (
                <div>No Contacts. Please add a new contact</div>
            )}

            {/* Grid layout for contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.content?.length > 0 &&
                    data.content.map((contact) => (
                        <Contact contact={contact} key={contact.id} />
                    ))
                }
            </div>

            {/* Pagination controls */}
            {data?.content?.length > 0 && data?.totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => getAllContacts(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        &laquo;
                    </button>

                    {data && [...Array(data.totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => getAllContacts(page)}
                            className={`px-4 py-2 border border-gray-300 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => getAllContacts(currentPage + 1)}
                        disabled={currentPage === data.totalPages - 1}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        &raquo;
                    </button>
                </div>
            )}
        </div>
    );
}
