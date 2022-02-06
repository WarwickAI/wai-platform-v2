import { RegularElectionRoleFragment } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    previewImg: "",
}

export const setupEditValues = (roleDetails: RegularElectionRoleFragment) => {
    return {
        display: roleDetails.display || false,
        title: roleDetails.title || "",
        shortName: roleDetails.shortName || "",
        description: roleDetails.description || "",
        previewImg: roleDetails.previewImg || "",
    }
}

export default initalVals;