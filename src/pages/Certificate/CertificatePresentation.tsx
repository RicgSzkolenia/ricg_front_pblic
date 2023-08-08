import { useEffect, useState } from "react";
import * as React from 'react';
import { useParams } from "react-router-dom";
import { Base64 } from "js-base64";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import CertificateApi from "../../utils/apis/CertificateApi";
import styled from "styled-components";

const StyledCertificatePresentationPage = styled.div`
    width: 100%;
    .cert {
        width: 100%;
        height: 100vh;
    }
`

const CertificatePresentationPage = () => {

    const params = useParams();
    const [ certificate, setCertificate ] = useState<any>();
    const [ url, setUrl ] = useState<any>();
  

    useEffect(() => {
        const certificateId = params.id;
        if (certificateId) {
            CertificateApi.getCertificateByUniqueId(certificateId).then((res:any) => {
                setCertificate(res.data.cert);
            });
           
        }
    }, [])
    
    return(
        <StyledCertificatePresentationPage>
            {  certificate && <embed type="application/pdf" className="cert" src={`data:application/pdf;base64,${certificate?.certificate}` + "#toolbar=0"} />}
        </StyledCertificatePresentationPage>
    )
}

export default CertificatePresentationPage;