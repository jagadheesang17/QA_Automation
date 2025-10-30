import { credentials } from "./apiUtil";
import apiName from "./learner_api_Name.json"

let userId = credentials.data.id

export let getCourseDetails = (username: string, catalogCode: string) => ({
    user_id: userId,
    username: username,
    catalog_code: catalogCode,
    api_name: apiName.getCourseDetails,
    response_fields: [
        "title",
        "code",
        "description",
        "language_name",
        "language_code",
        "type",
        "delivery_type",
        "status_name",
        "price",
        "duration",
        "currency",
        "currency_code",
        "currency_symbol",
        "provider_name",
        "tag_name",
        "dedicated_to_tp",
        "registration_end_on",
        "min_seat",
        "max_seat",
        "waitlist_seat",
        "additional_info",
        "contact_support",
        "thumbnail",
        "share_url",
        "published_on",
        "category_name",
        "prerequisite_details",
        "equivalence_details",
    ]
});

export const getInstancesDetails = (username: string, catalogCode: string) => ({
    user_id: userId,
    username: username,
    catalog_code: catalogCode,
    api_name: apiName.getInstancesDetails,
    response_fields: [
        "title",
        "code",
        "description",
        "type",
        "delivery_type",
        "thumbnail",
        "duration",
        "language_name",
        "status_name",
        "assignment_type",
        "published_on",
        "currency_code",
        "currency_symbol",
        "currency",
        "price",
        "category_name",
        "category_code",
        "is_compliance",
        "max_seat",
        "min_seat",
        "seat_left",
        "waitlist_seat",
        "provider_name",
        "tag_name",
        "registration_end_on",
        "share_url",
    ]
});


export const registerCourse = (username: string, catalogCode: string) => ({
    user_id: userId,
    username: username,
    catalog_code: catalogCode,
    api_name: apiName.registerCourse,
    response_fields: [
        "result"
    ]
});

export const getCourseEnrollments = (username: string) => ({
    user_id: userId,
    username: username,
    api_name: apiName.getCourseEnrollments,
    response_fields: [
        "catalog_thumbnail",
        "catalog_title",
        "catalog_description",
        "catalog_type",
        "catalog_sub_type",
        "catalog_status",
        "catalog_provider",
        "mandatory",
        "compliance",
        "registration_status",
        "registration_date",
        "registered_by",
        "completion_date",
        "completion_status",
        "completion_by",
        "progress",
        "score",
        "waitlist_priority",
        "due_on",
        "register_type",
        "expired_on",
        "cancel_reason",
        "attached_program_type",
        "created_by",
        "created_on",
        "updated_by",
        "updated_on",

    ]
});

export const getProgramDetails = (username: string, catalogCode: string) => ({
    user_id: userId,
    username: username,
    catalog_code: catalogCode,
    api_name: apiName.getProgramDetails,
    response_fields: [
        "title",
        "code",
        "description",
        "language_name",
        "type",
        "language_code",
        "delivery_type",
        "version",
        "assignment_type",
        "status_name",
        "price",
        "currency",
        "currency_code",
        "currency_symbol",
        "duration",
        "provider_name",
        "tag_name",
        "registration_end_on",
        "compliance_completed",
        "complete_date",
        "complete_days",
        "additional_info",
        "contact_support",
        "thumbnail",
        "share_url",
        "published_on",
        "category_name",
        "enforce_sequence",
        "expiry_details",
        "optional_completion_count",
        "mandatory_completion_count",
        "course_mandatory_completion_count",
        "module_level_completion_rule",
        "prerequisite_details",

    ]
});

export const registerProgram = (username: string, catalogCode: string) => ({
    user_id: userId,
    username: username,
    catalog_code: catalogCode,
    api_name: apiName.registerProgram,
    response_fields: [
        "result",
        "message"
    ]
});

export const getProgramEnrollments = (username: string) => ({
    user_id: userId,
    username: username,
    api_name: apiName.getProgramEnrollments,
    response_fields: [
        "program_title",
        "program_code",
        "is_current",
        "recertify_path",
        "mandatory",
        "compliance",
        "register_date",
        "register_status_name",
        "register_type",
        "completion_date",
        "completion_status_name",
        "due_on",
        "expired_on",
        "score",
        "progress",

    ]
});

export const registerProgramCourse = (code: any, courseCode: string, enrollUser: string) => ({
    user_id: userId,
    program_code: code,
    instance_code: courseCode,
    username: enrollUser,
    api_name: apiName.registerProgramCourse,
    response_fields: [
        "result",
        "message"
    ]
});

export const getProgramModulesDetails = (username: string, programCode: string) => ({
    user_id: userId,
    username: username,
    program_code: programCode,
    api_name: apiName.getProgramModulesDetails,
    response_fields: [
        "title",
        "module_level_completion_rule",
        "mandatory_completion_count",
        "optional_completion_count",
        "course_count",
        "optional_course_count",
        "sequence",

    ]
});

export const getProgramCourseDetails = (username: string, programCode: string) => ({
    user_id: userId,
    username: username,
    program_code: programCode,
    api_name: apiName.getProgramCourseDetails,
    response_fields: [
        "sequence",
        "course_title",
        "course_code",
        "delivery_type",
        "is_required",
        "course_prerequisite",
        "instance_count",
    ]
});

export const getCatalogList = (username: string) => ({
    user_id: userId,
    username: username,
    api_name: apiName.getCatalogList,
    response_fields: [
       "title",
"code",
"description",
"duration",
"language_name",
"status_name",
"type",
"delivery_type",
"thumbnail",
"category_name",
"category_code",
"assignment_type",
"currency_code",
"price",
"is_compliance",
"provider_name",
"registration_end_on",
"share_url",

    ]
});

export const getSessionDetails = (username: string, instanceCode: string) => ({
    user_id: userId,
    username: username,
    instance_code: instanceCode,
    api_name: apiName.getSessionDetails,
    response_fields: [
 "title",
"session_date",
"session_starttime",
"session_endtime",
"presenter_url",
"attendee_url",
"timezone_name",
"vc_meeting_type",
"duration",
"location_name",

    ]
});


export const GetContentLaunchURL = (username: string, courseCode: string) => ({
    user_id: userId,
    username: username,
    course_code: courseCode,
    api_name: apiName.GetContentLaunchURL,
    response_fields: [
        "url"
    ]
});


export const cancelCourseEnrollment = (userName: any, instCode: any) => ({
    username: userName,
    instance_code: instCode,
    api_name: apiName.cancelCourseEnrollment,
    cancel_reason:"Simple Test",
    response_fields: [
        "status",
        "message",
    ]
});

export const cancelTPEnrollment = (username: string, programCode: string) => ({
    username: username,
    program_code: programCode,
    cancel_reason: "None",
    api_name: apiName.cancelProgramEnrollment,
    response_fields: ["status",
        "message",
    ],
})
export const getProgramEnrollmentCount = (username: string, programCode: string) => ({
    username: username,
    program_code: programCode,
    cancel_reason: "None",
    api_name: apiName.cancelProgramEnrollment,
    response_fields: ["status",
        "message",
    ],
})