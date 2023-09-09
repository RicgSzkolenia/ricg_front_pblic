import { useEffect, useState } from "react";
import { Opinion } from "../../utils/models/Opinion";
import CustomCarousel from "../customCarousel/CustomCarousel";
import customCarouselSettingsConstants from "../customCarousel/customCarouselSettingsConstants";
import OpinionCard, { OpinionCardType } from "../opinionCard/OpinionCard";
import opinionApi from "../../utils/apis/OpinionApi";

const OpinionSection = () => {
    const [ opinions, setOpinions ] = useState<Array<Opinion>>([]);

    useEffect(() => {
       refreshOpinions();
    }, [])

    const refreshOpinions = () => {
      opinionApi.getAllOpinions().then((opinions:any) => {
        setOpinions(opinions)
      })
    }

    return (
        <div
            className="home-reviews section-top-bottom-margin ">
            <p className="home-reviews-title blueSecondaryHeader section-header-top-bottom-marginpCard">
              Opinie
            </p>
            <CustomCarousel
              settings={customCarouselSettingsConstants.customOpinionCarouselSettings}
            >
              <OpinionCard
                      type={OpinionCardType.add}
                      refreshOpinions={refreshOpinions}
              />
              {opinions.map((opinion, index) => {
                return (
                  <div key={index}>
                    <OpinionCard
                      opinion={opinion}
                      refreshOpinions={refreshOpinions}
                    />
                  </div>
                );
              })}
                
            </CustomCarousel>
          </div>
    )
}

export default OpinionSection;