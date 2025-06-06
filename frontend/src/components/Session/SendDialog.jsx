import React, { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet";

function SendDialog({ questionnaireId }) {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const isSending = useRef(false);
  const dialogRef = useRef();

  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "VP of Marketing",
      company: "Innovate Tech Solutions",
      email: "sarah.johnson@example.com",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Senior Product Manager",
      company: "Future Systems Inc",
      email: "michael.chen@example.com",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Director of Operations",
      company: "Global Dynamics",
      email: "elena.rodriguez@example.com",
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.position.toLowerCase().includes(search.toLowerCase()) ||
      client.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleClientSelection = (client) => {
    if (selectedClients.some((c) => c.id === client.id)) {
      setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
    } else {
      setSelectedClients([...selectedClients, client]);
    }
  };

  const handleSend = async () => {
    if (isSending.current) return;
    isSending.current = true;

    if (selectedClients.length === 0) {
      toast.error("Please select at least one client.");
      isSending.current = false;
      return;
    }

    try {
      await axios.post(
        `https://api.testir.xyz/server26/api/questionnaires/${questionnaireId}/send`,
        { clients: selectedClients },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Questionnaire sent successfully!");
      setIsOpen(false);
      setSelectedClients([]);
      setSearch("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send questionnaire.");
    } finally {
      isSending.current = false;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Helmet>
        <title>Send Dialog - NextGenCoach</title>
        <meta name="description" content="Send questions to desired clients" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] font-medium text-white hover:text-red-600 rounded-full flex items-center gap-2"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Send
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send-horizontal w-4 h-4"
        >
          <path d="m3 3 3 9-3 9 19-9Z" />
          <path d="M6 12h16" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 w-full rounded-lg flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-dialog-title"
        >
          <div
            ref={dialogRef}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h2 id="send-dialog-title" className="text-lg font-semibold text-black">
                Select Clients
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
                aria-label="Close dialog"
              >
                <RxCross2 />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full border text-black placeholder:text-black placeholder:text-[17px] border-gray-300 rounded-md px-8 py-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search clients"
              />
              <IoIosSearch className="absolute top-[10px] text-2xl left-2 text-black" />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y scrollbar-hide" tabIndex={0}>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => toggleClientSelection(client)}
                    className={`p-3 cursor-pointer hover:bg-blue-100 rounded text-start flex justify-between items-center ${
                      selectedClients.some((c) => c.id === client.id)
                        ? "bg-blue-100 border border-blue-500"
                        : ""
                    }`}
                    role="checkbox"
                    aria-checked={selectedClients.some((c) => c.id === client.id)}
                    tabIndex={-1}
                  >
                    <div>
                      <p className="font-medium text-gray-700">{client.name}</p>
                      <p className="text-sm text-gray-600">{client.position}</p>
                      <p className="text-sm text-gray-500">{client.company}</p>
                    </div>
                    {selectedClients.some((c) => c.id === client.id) && (
                      <span className="text-blue-600 font-bold">✓</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center">No clients found.</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={handleSend}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-[#16a181] text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SendDialog;