import { ApplyRoleInput, RoleApplicationInput } from "./RoleApplicationInput";

export const validateRoleApplication = (options: RoleApplicationInput | ApplyRoleInput) => {
    if (options.title.length <= 2) {
        return [
            {
                field: "title",
                message: "length must be greater than 2",
            },
        ];
    }

    if (options.shortName.length <= 2) {
        return [
            {
                field: "shortName",
                message: "length must be greater than 2",
            },
        ];
    }

    if (["/", " ", "?"].some(el => options.shortName.includes(el))) {
        return [
            {
                field: "shortName",
                message: "cannot include '\/', 'space' , '\?'",
            },
        ];
    }
    return null;
};
