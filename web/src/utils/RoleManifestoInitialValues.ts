import { RegularRoleManifestoFragment } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    img: "",
}

export const setupEditValues = (manifestoDetails: RegularRoleManifestoFragment) => {
    return {
        display: manifestoDetails.display || false,
        title: manifestoDetails.title || "",
        shortName: manifestoDetails.shortName || "",
        description: manifestoDetails.description || "",
        img: manifestoDetails.img || "",
    }
}

export default initalVals;