import { RegularCourseFragment, RegularProjectFragment, RegularTalkFragment, RegularTutorialFragment, TagInput } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    previewImg: "",
    iconImg: "",
    coverImg: "",
    redirectUrl: "",
    joinable: false,
    tags: [],
}

export const setupEditValues = (eventDetails:
    | RegularCourseFragment
    | RegularProjectFragment
    | RegularTalkFragment
    | RegularTutorialFragment) => {
    return {
        display: eventDetails.display || false,
        title: eventDetails.title || "",
        shortName: eventDetails.shortName || "",
        description: eventDetails.description || "",
        previewImg: eventDetails.previewImg || "",
        iconImg: eventDetails.iconImg || "",
        coverImg: eventDetails.coverImg || "",
        redirectUrl: eventDetails.redirectUrl || "",
        joinable: eventDetails.joinable || false,
        tags: eventDetails.tags.map(tag => { return { title: tag.title, color: tag.color } }) || []
    }
}

export default initalVals;