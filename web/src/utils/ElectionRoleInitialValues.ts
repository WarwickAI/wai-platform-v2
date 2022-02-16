import { RegularElectionRoleFragment } from "../generated/graphql";

var initalVals = {
    display: false,
    title: "",
    shortName: "",
    description: "",
    applicationTemplate: "",
    previewImg: "",
    canApply: false,
}

export const setupEditValues = (roleDetails: RegularElectionRoleFragment) => {
    return {
        display: roleDetails.display || false,
        title: roleDetails.title || "",
        shortName: roleDetails.shortName || "",
        description: roleDetails.description || "",
        applicationTemplate: roleDetails.applicationTemplate || "",
        previewImg: roleDetails.previewImg || "",
        canApply: roleDetails.canApply || false
    }
}

export default initalVals;