import { TikTokEmbed } from "react-social-media-embed"
import Slider from "react-slick"
import { tiktokCarouselSettings as settings } from "./tiktokCarouselSettings"
import { useEffect, useState } from "react"
import VideoApi from "../../utils/apis/VideoApi"
import styled from "styled-components"

const StyledVidsBody = styled.div`
    width: 90%;
    max-width: 1440px;
    margin: 0 auto;
    .slick-slide {
        display: flex !important;
        justify-content: center;
        align-items:center;
    }

`

const StyledVidsItem = styled.div`

`

const TiktokVidsSection = (props:any) => {

    const [ videos, setVideos ] = useState<Array<any>>();

    useEffect(() => {
        VideoApi.getAllVideos().then((vids) => {
            setVideos(vids);
        })
    }, [])

    return (
        <div className="section-top-bottom-margin ">
            <div className='blueSecondaryHeader imagetextSection-header section-header-top-bottom-margin'>Tik Toki</div>
            <StyledVidsBody>
                <Slider {...settings}>
                    { videos?.map((video, index) => {
                        return(
                            <StyledVidsItem key={index}>
                                <TikTokEmbed width={320} height={585} url={video}></TikTokEmbed>
                            </StyledVidsItem>
                        )
                    })}
                </Slider>
            </StyledVidsBody>
        </div>
    )
}

export default TiktokVidsSection