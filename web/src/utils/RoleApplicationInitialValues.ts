import { RegularRoleApplicationFragment } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    img: "",
}

export const setupEditValues = (applicationDetails: RegularRoleApplicationFragment) => {
    return {
        display: applicationDetails.display || false,
        title: applicationDetails.title || "",
        shortName: applicationDetails.shortName || "",
        description: applicationDetails.description || "",
        img: applicationDetails.img || "",
    }
}

export default initalVals;