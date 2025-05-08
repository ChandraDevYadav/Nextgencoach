import React from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import { GrMicrophone } from "react-icons/gr";


const AlertDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-100 rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Connect to Zoom Meeting</h2>
        <p className="mb-6">
          NextGen Coach needs permission to connect to your ongoing Zoom meeting for the coaching session.
        </p>
        <div className="space-y-2">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-[#33c9a642] p-3 rounded-full hover:bg-[#1bf9c583]">
            <GoDeviceCameraVideo className="text-[#33C9A7] text-lg"/>
            </div>
          <div>
          <h1 className="font-medium">Camera Access</h1>
          <p>Allow NextGen Coach to use your camera</p>
          </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="bg-[#33c9a642] p-3 rounded-full hover:bg-[#1bf9c583]">
            <GrMicrophone className="text-[#33C9A7] text-lg" />
            </div>
          <div>
          <h1 className="font-medium">Microphone Access</h1>
          <p>Allow NextGen Coach to use your microphone</p>
          </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-white rounded-full hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white rounded-full">
            Allow & Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;