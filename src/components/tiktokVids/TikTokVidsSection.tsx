import { TikTokEmbed } from "react-social-media-embed"
import Slider from "react-slick"
import { tiktokCarouselSettings as settings } from "./tiktokCarouselSettings"
import { useEffect, useState } from "react"
import VideoApi from "../../utils/apis/VideoApi"
import styled from "styled-components"

const StyledVidsBody = styled.div`
    width: 95%;
    margin: 0 auto;
`

const TiktokVidsSection = (props:any) => {

    const [ videos, setVideos ] = useState<Array<any>>();

    useEffect(() => {
        VideoApi.getAllVideos().then((vids) => {
            setVideos(vids);
        })
    }, [])

    return (
        <div className="section">
            <div className='blueSecondaryHeader imagetextSection-header' data-aos={'fade-down'}  data-aos-duration="1500" data-aos-delay="150">Nasze Tik Toki</div>
            <StyledVidsBody>
                <Slider {...settings}>
                    { videos?.map((video, index) => {
                        return(
                            <div key={index}>
                                <TikTokEmbed url={video}></TikTokEmbed>
                            </div>
                        )
                    })}
                </Slider>
            </StyledVidsBody>
        </div>
    )
}

export default TiktokVidsSection