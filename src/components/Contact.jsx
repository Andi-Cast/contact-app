import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMap } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Contact({ contact }) {
    return(
        <Link to={`/contacts/${contact.id}`}>
            <div className="border-solid border-2 border-gray-500 rounded-lg p-5">
                <div className="flex gap-4">
                    <div>
                        <img 
                            className="w-12 h-12 rounded-full"
                            src={contact.photoUrl} 
                            alt={contact.name} 
                        />
                    </div>
                    <div>
                        <div className="font-bold text-lg">{contact.name.substring(0,15)}</div>
                        <div className="text-md text-gray-500">{contact.title}</div>
                    </div>
                </div>
                <div className="flex flex-col *:mt-3">
                    <div className=" flex gap-3">
                        <div><FontAwesomeIcon icon={faEnvelope}/></div>
                        <div>{contact.email.substring(0,20)}</div>
                    </div>
                    <div className=" flex gap-3">
                        <div><FontAwesomeIcon icon={faMap}/></div>
                        <div>{contact.address}</div>
                    </div>
                    <div className=" flex gap-3">
                        <div><FontAwesomeIcon icon={faPhone}/></div>
                        <div>{contact.phone}</div>
                    </div>
                    <div className=" flex gap-3">
                        <div><FontAwesomeIcon icon={faCheck}/></div>
                        <div>{contact.status}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}