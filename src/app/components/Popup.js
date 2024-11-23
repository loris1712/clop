import { useState, useEffect } from "react";

export default function Popup({ type, onClose, onSaveCode, onSwitchPopUp, usercode }) {
  const [userCode, setUserCode] = useState("");
  const [userCodeList, setUserCodeList] = useState("");
  const [userCodeTable, setUserCodeTable] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    console.log(usercode)
    if(usercode){
      setUserCodeList(usercode)
      setUserCodeTable(usercode)
    }
  }, [usercode]);

  const renderContent = () => {
    if (type === "login") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Insert your code</h3>
          <input
            type="text"
            placeholder="User code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
          />
          <button
            onClick={() => onSaveCode(userCode, "session")}
            className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px] w-full"
          >
            Login
          </button>
          <button
            onClick={onSwitchPopUp}
            className="bg-[#2b2b2b] rounded-[100px] hover:brightness-110 text-white py-3 px-8 font-semibold text-[11px] w-full mt-4"
          >
            Don't have user code? Request it here.
          </button>
        </div>
      );
    }

    if (type === "request") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Request your code</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Instagram Nickname"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
          />
          <button
            onClick={() => {
              onSaveCode({ email, instagram }, "request");
            }}
            className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px] w-full"
          >
            Request Code
          </button>
        </div>
      );
    }

    if (type === "volt") {
      return (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Lista */}
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">VOLT List</h3>
            <div className="text-[12px] mb-2">
              <p>Enter your personal code to be added to the CLEOPE list for the VOLT event on December 12th. Being added to the list does not guarantee access to the event. It is required to participate in the pre-selection process at the entrance.</p>
            </div>
           
            <input
              type="text"
              placeholder="Insert your user code"
              value={userCodeList}
              onChange={(e) => setUserCodeList(e.target.value)}
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
            />
            <button
              onClick={() => onSaveCode(userCodeList, "lista")}
              className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px]"
            >
              Request List
            </button>
          </div>

          {/* Tavoli */}
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">VOLT Tables</h3>
            
            <div className="text-[12px] mb-2">
              <p>Enter your personal code to request a table for the VOLT event on December 12th. You will be contacted by the CLEOPE team via email.</p>
            </div>

            <input
              type="text"
              placeholder="Insert your user code"
              value={userCodeTable}
              onChange={(e) => setUserCodeTable(e.target.value)}
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
            />
            <button
              onClick={() => onSaveCode(userCodeTable, "tavoli")}
              className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px]"
            >
              Request Table
            </button>
          </div>
        </div>
          <button
            onClick={onSwitchPopUp}
            className="bg-[#2b2b2b] rounded-[100px] hover:brightness-110 text-white py-3 px-8 font-semibold text-[11px] w-full mt-4"
          >
            Don't have user code? Request it here.
          </button>
        </div>
        
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
      <div
        className="p-6 w-11/12 sm:w-2/3 lg:w-1/2"
        style={{
          background: "#030303b5",
          border: "1px solid #ffffff33",
          borderBottomLeftRadius: "30px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "0px",
        }}
      >
        {renderContent()}
        <button
          onClick={onClose}
          className="text-gray-400 w-full mt-4 text-[12px]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
