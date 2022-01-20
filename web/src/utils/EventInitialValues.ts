import { RegularCourseFragment, RegularEventFragment, RegularProjectFragment, RegularTalkFragment, RegularTutorialFragment } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    previewImg: "",
    iconImg: "",
    coverImg: "",
    redirectUrl: "",
    joinable: false
}

export const setupEditValues = (eventDetails:
    | RegularEventFragment
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
        joinable: eventDetails.joinable || false
    }
}

export default initalVals;