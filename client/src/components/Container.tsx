import { useEffect, useState } from "react"
import FormContainer from "./FormContainer"
import { UrlData } from "../types"
import axios from "axios";
import { serverUrl } from "../utils/constants";
import DataTable from "./DataTable";


const Container = () => {
    const [data, setData] = useState<UrlData[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    const updateReloadState = (): void => {
        setReload(true);
    }
    const fetchTableData = async () => {
        const response = await axios.get(`${serverUrl}/short-url`);
        console.log("response from server is ", response);
        setData(response.data.shortUrls);
        console.log("data: ", data);
        setReload(false);
    }

    useEffect(() => {
        fetchTableData();
    }, [reload]);
  return (
    <div>
        <FormContainer updateReloadState={updateReloadState} />
        <DataTable updateReloadState={updateReloadState} data={data} />
    </div>
  )
}

export default Container