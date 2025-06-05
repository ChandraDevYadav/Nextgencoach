import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ZoomMeetingViewer = () => {
  const [searchParams] = useSearchParams();
  const meetingRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  const meetingNumber = searchParams.get("meetingNumber");
  const password = searchParams.get("password");
  const userName = searchParams.get("userName") || "Participant";

  // Use Zoom Web SDK v2.12.2 URLs for stability
  const SDK_URLS = {
    react: [
      "https://source.zoom.us/2.12.2/lib/vendor/react.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js",
    ],
    reactDom: [
      "https://source.zoom.us/2.12.2/lib/vendor/react-dom.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js",
    ],
    redux: [
      "https://source.zoom.us/2.12.2/lib/vendor/redux.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.2/redux.min.js",
    ],
    reduxThunk: [
      "https://source.zoom.us/2.12.2/lib/vendor/redux-thunk.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.4.1/redux-thunk.min.js",
    ],
    lodash: [
      "https://source.zoom.us/2.12.2/lib/vendor/lodash.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
    ],
    zoomMtg: [
      "https://source.zoom.us/2.12.2/zoom-meeting-2.12.2.min.js",
      "https://cdn.jsdelivr.net/npm/@zoomus/websdk@2.12.2/dist/zoom-meeting-2.12.2.min.js",
    ],
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadZoomSDK = async () => {
      try {
        // Remove old Zoom SDK scripts if any
        document
          .querySelectorAll("script[data-zoom-sdk]")
          .forEach((el) => el.remove());

        console.log("Starting to load Zoom SDK dependencies...");

        await loadScriptWithFallback("react", 0);
        await loadScriptWithFallback("reactDom", 0);
        await loadScriptWithFallback("redux", 0);
        await loadScriptWithFallback("reduxThunk", 0);
        await loadScriptWithFallback("lodash", 0);
        await loadScriptWithFallback("zoomMtg", 0);

        console.log("All dependencies loaded successfully");

        // Assign globals expected by Zoom SDK
        window.react = window.React;
        window["react-dom"] = window.ReactDOM;
        window.redux = window.Redux;
        window["redux-thunk"] = window.ReduxThunk;
        window.lodash = window._;

        if (isMounted) {
          console.log("Initializing Zoom meeting...");
          initializeMeeting();
        }
      } catch (error) {
        console.error("SDK load error:", error);
        if (isMounted) {
          setError("Failed to load meeting components. Please try again.");
          setLoading(false);
        }
      }
    };

    const loadScriptWithFallback = async (lib, attempt) => {
      try {
        console.log(`Attempting to load ${lib} from ${SDK_URLS[lib][attempt]}`);
        await loadScript(
          SDK_URLS[lib][attempt],
          `${lib}-${attempt}`,
          controller.signal
        );
        if (attempt > 0) setUsingFallback(true);
        console.log(
          `Successfully loaded ${lib} from ${SDK_URLS[lib][attempt]}`
        );
      } catch (error) {
        console.error(
          `Failed to load ${lib} from ${SDK_URLS[lib][attempt]}:`,
          error
        );
        if (attempt < SDK_URLS[lib].length - 1) {
          console.log(`Trying fallback URL for ${lib}`);
          return loadScriptWithFallback(lib, attempt + 1);
        }
        throw new Error(`All ${lib} sources failed`);
      }
    };

    const loadScript = (src, id, signal) => {
      return new Promise((resolve, reject) => {
        if (signal?.aborted) {
          console.log("Loading aborted for", src);
          return reject(new DOMException("Aborted", "AbortError"));
        }

        const existing = document.getElementById(id);
        if (existing) {
          if (existing.dataset.loaded === "true") {
            console.log("Script already loaded:", src);
            return resolve();
          }
          existing.remove();
        }

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.setAttribute("data-zoom-sdk", "true");
        script.async = true;

        script.onload = () => {
          console.log("Script loaded successfully:", src);
          script.dataset.loaded = "true";
          resolve();
        };

        script.onerror = () => {
          console.error("Script failed to load:", src);
          reject(new Error(`Failed to load ${src}`));
        };

        if (signal) {
          signal.addEventListener("abort", () => {
            script.remove();
            reject(new DOMException("Aborted", "AbortError"));
          });
        }

        document.body.appendChild(script);
      });
    };

    const initializeMeeting = async () => {
      try {
        if (!window.ZoomMtg) {
          throw new Error("Zoom SDK not available");
        }

        const { ZoomMtg } = window;

        // Set Zoom JS lib base URL and AV path
        const baseUrl = usingFallback
          ? "https://cdn.jsdelivr.net/npm/@zoomus/websdk@2.12.2/dist"
          : "https://source.zoom.us/2.12.2";

        ZoomMtg.setZoomJSLib(baseUrl, "/av");

        console.log("Pre-loading WebAssembly...");
        await ZoomMtg.preLoadWasm();
        await ZoomMtg.prepareWebSDK();
        console.log("WebAssembly pre-loaded");

        console.log("Requesting meeting signature...");
        const response = await axios.get(
          `/api/zoom/signature?meetingNumber=${meetingNumber}&password=${password}&userName=${encodeURIComponent(
            userName
          )}`,
          { signal: controller.signal }
        );
        const { signature, sdkKey } = response.data;
        console.log("Signature received");

        console.log("Initializing Zoom meeting...");

        const client = ZoomMtg.createClient();

        const meetingConfig = {
          sdkKey,
          signature,
          meetingNumber,
          password,
          userName,
          leaveUrl: window.location.origin,
        };

        client.init({
          ...meetingConfig,
          webEndpoint: "zoom.us",
          success: () => {
            console.log("Zoom client initialized successfully");
            client.join({
              success: () => {
                console.log("Joined meeting successfully");
                if (isMounted) setLoading(false);
              },
              error: (err) => {
                console.error("Join meeting error:", err);
                if (isMounted) {
                  setError(`Failed to join: ${err.message}`);
                  setLoading(false);
                }
              },
            });
          },
          error: (err) => {
            console.error("Initialization error:", err);
            if (isMounted) {
              setError(`Initialization failed: ${err.message}`);
              setLoading(false);
            }
          },
        });
      } catch (err) {
        console.error("Meeting initialization error:", err);
        if (isMounted && !controller.signal.aborted) {
          setError(`Meeting error: ${err.message}`);
          setLoading(false);
        }
      }
    };

    loadZoomSDK();

    return () => {
      isMounted = false;
      controller.abort();
      if (window.ZoomMtg) {
        try {
          console.log("Cleaning up Zoom meeting");
          window.ZoomMtg.destroyClient();
        } catch (e) {
          console.log("Cleanup error:", e);
        }
      }
    };
  }, [meetingNumber, password, userName, retryCount, usingFallback]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setRetryCount((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Meeting
          </h2>
          <p className="text-gray-600 mb-4">
            {retryCount > 0 ? "Reconnecting..." : "Initializing meeting..."}
          </p>
          {retryCount > 0 && (
            <p className="text-sm text-gray-500">
              Attempt {retryCount + 1} of 3
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="mx-auto mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Meeting Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={retryCount >= 2}
              className={`w-full py-2 px-4 rounded-md font-medium ${
                retryCount >= 2
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {retryCount >= 2 ? "Maximum retries reached" : "↻ Try Again"}
            </button>

            <button
              onClick={() => navigate("/live/create")}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-black font-medium rounded-md"
            >
              ＋ Create New Meeting
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md"
            >
              ← Return Home
            </button>
          </div>

          {retryCount >= 1 && (
            <div className="mt-6 p-3 bg-yellow-50 rounded-md text-sm text-yellow-800">
              <p>Still having trouble? Try:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Checking your internet connection</li>
                <li>Disabling ad blockers</li>
                <li>Using a different browser</li>
                <li>Enabling third-party cookies</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-900">
      <div className="relative z-10 h-full flex flex-col">
        <header className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            <h1 className="font-medium">Live Session: {meetingNumber}</h1>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => window.ZoomMtg?.showInviteOption?.()}
              className="text-sm bg-gray-700 hover:bg-gray-600 py-1 px-3 rounded"
            >
              Invite
            </button>
            <button
              onClick={() => {
                window.ZoomMtg?.leaveMeeting?.();
                navigate("/");
              }}
              className="text-sm bg-red-600 hover:bg-red-700 py-1 px-3 rounded"
            >
              Leave
            </button>
          </div>
        </header>

        <div className="flex-1 bg-black">
          <div
            ref={meetingRef}
            id="zoom-meeting-container"
            className="h-full w-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeetingViewer;
