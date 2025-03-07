import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { serverUrl } from "../utils/constants";

interface FormContainerProps {
    updateReloadState: () => void;
}

const FormContainer = ({ updateReloadState }: FormContainerProps) => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.post(`${serverUrl}/short-url`, {
            fullUrl: fullUrl
        });
        setFullUrl("");
        updateReloadState();
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-2">
      <div className=" my-8 rounded-xl bg-black">
        <div className="w-full h-screen rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-4xl text-center pb-4">Nano Link</h2>
          <p className="text-white text-center pb-2 text-xl font-extralight">
            paste your untidy link to shorten it
          </p>
          <p className="text-white text-center pb-4 text-sm font-thin">
            free tool to shorten a URL or reduce link, Use our URL shortner to
            create a shortened & neat link making it easy to use{" "}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortner.link/
                </div>
                <input
                  type="text"
                  value={fullUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                  placeholder="add your link"
                  required
                  className="block w-full p-4 text-sm text-gray-900 ps-32 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Shorten Url
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
