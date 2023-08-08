import { useEffect, useState } from "react";
import { Opinion } from "../../utils/models/Opinion";
import { opinions } from "../carouselSection/slides";
import CustomCarousel from "../customCarousel/CustomCarousel";
import customCarouselSettingsConstants from "../customCarousel/customCarouselSettingsConstants";
import OpinionCard from "../opinionCard/OpinionCard";
import opinionApi from "../../utils/apis/OpinionApi";

const OpinionSection = () => {
    const [ opinions, setOpinions ] = useState<Array<Opinion>>([]);

    useEffect(() => {
        opinionApi.getAllOpinions().then((opinions:any) => {
            setOpinions(opinions)
          })
    }, [])
    return (
        <div
            className="home-reviews"
            data-aos={"fade-down"}
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <p className="home-reviews-title blueSecondaryHeader">
              Opinie O Kursie
            </p>
            <CustomCarousel
              settings={customCarouselSettingsConstants.customOpinionCarouselSettings}
            >
              {opinions.map((opinion, index) => {
                return (
                  <div key={index}>
                    <OpinionCard
                      opinion={opinion}
                    />
                  </div>
                );
              })}
             { opinions.length === 0 ? (<div>
                <OpinionCard
                      opinion={{ authorName: 'RICG', opinion: 'Nie posiadamy teraz zadnych opininii. Bylibysmy wdzieczni za podanie swoich opinii o webinarach po przez contact us form', avatarLink: '' }}
                    />
             </div>) : '' }
            </CustomCarousel>
          </div>
    )
}

export default OpinionSection;